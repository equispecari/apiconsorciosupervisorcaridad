import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  BadRequestException,
  Query,
} from '@nestjs/common';
import {
  ObservacionesReqDto,
  DerivarReqDto,
  CreateReqInfoDto,
  QuerysReqDto,
  idReqDto,
  UpdateReqInfoDto,
  RechazadoReqDto,
} from './dto';
import { AreaService } from '../area/area.service';
import { TenantService } from '../tenant/tenant.service';
import { repeat } from 'lodash';
import { ConfigService } from '@nestjs/config';

const moment = require('moment-timezone');
import { HoursOfAttention } from '../shared/utils/hours-of-attention';
import { UploadService } from '../upload/upload.service';
import { MailService } from '../mail/mail.service';
import { Auth, User } from '@shared/decorators';
import { RoleEnum, UserTypeEnum, StateEnum } from '@shared/constants';
import { UserService } from '../user/user.service';
import { UserAuth } from '@shared/interfaces';
import { TramiteService } from './tramite.service';

@Controller('tramite')
export class TramiteController {
  constructor(
    private readonly _userService: UserService,
    private readonly _reqDocService: TramiteService,
    private readonly _awsS3Service: UploadService,
    private readonly _incrementService: TenantService,
    private readonly _nodemailder: MailService,
    private readonly _config: ConfigService,
    private readonly _areaService: AreaService,
  ) {}

  @Post('create')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.USER)
  async createTramite(
    @User() userAuth: UserAuth,
    @Body() create: CreateReqInfoDto,
  ) {
    const inc = await this._incrementService.getNumDocSede(userAuth.tenantId); //TODO SEDE

    const num_serie =
      inc.name + repeat('0', 6 - inc.nro_doc.toString().length) + inc.nro_doc;

    const user = await this._userService.getUserById(userAuth.id);

    const dateReception = HoursOfAttention.getNewHour(inc.horario);
    const reqDoc = await this._reqDocService.create({
      data: create,
      num_serie,
      owner: user._id,
      tenant: userAuth.tenantId,
    });

    if (user.type === UserTypeEnum.JURIDICA) user.lastname = '';

    const { key } = await this._awsS3Service.generateQrGrupPdf({
      codigo: num_serie,
      DOC_ID: user.idCard,
      fecha: dateReception,
      remitente: user.name + ' ' + user.lastname,
      tipo: reqDoc.data.tipoDoc,
      asunto: reqDoc.data.asunto,
      folios: reqDoc.data.folios,
      email_remi: user.email,
      nomenclatura: reqDoc.data.nomenclatura,
      sede: inc.name,
      sedeName: inc.longName,
    });
    const url = `${this._config.get('FRONT_URL')}/buscar/${num_serie}`;

    reqDoc.pdf = key;
    const html = `
    <h4>Estimad@</h4>
    <p>Su trámite se ha registrado con el siguiente código de registro ${num_serie}, ${url}</p>
    
    <a href="${reqDoc.pdf}">
      <img 
        title="CARGO"
        src="https://summit-dew.s3.us-east-2.amazonaws.com/email/pdf.png"
        width=75" 
        height="75">
    </a>
    </br>
    </br>
    <hr>
    <div style="text-align: right;">
      <p>Saludos,</br>
      Mesa de Partes Virtual</br>
      Consorcio San Miguel</p>
    </div>
    
    `;
    this._nodemailder.sendEmailToWithData(
      user.email,
      'Consorcio San Miguel - Registro y cargo',
      html,
    );

    await reqDoc.save();

    return { message: reqDoc };
  }

  @Post('update/:id')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.USER)
  async updateTramite(
    @User() userAuth: UserAuth,
    @Body() update: UpdateReqInfoDto,
  ) {
    return null;

    const reqDoc = await this._reqDocService.getUDocById(userAuth.tenantId);

    if (reqDoc.estado !== StateEnum.OBSERVAR) {
      throw new BadRequestException('El documento ya fue derivado o rechazado');
    }
    const user = await this._userService.getUserById(userAuth.id);
    reqDoc.estado = StateEnum.MODIFICADO;
    const momentUtc = moment().utc().toDate();

    reqDoc.modified_at.push(momentUtc);

    reqDoc.data = update;

    const inc = await this._incrementService.getNumDocSedeNotSum(
      userAuth.tenantId,
    );

    const dateReception = HoursOfAttention.getNewHour(inc.horario);

    const { key } = await this._awsS3Service.generateQrGrupPdf({
      codigo: reqDoc.num_serie,
      DOC_ID: user.idCard,
      fecha: dateReception,
      remitente: user.name + ' ' + user.lastname,
      tipo: update.tipoDoc,
      asunto: update.asunto,
      folios: update.folios,
      email_remi: user.email,
      nomenclatura: update.nomenclatura,
      sede: inc.name,
      sedeName: inc.longName,
    });

    // if(reqDoc.pdf){
    //   this._awsS3Service.deleteS3Object(reqDoc.pdf)
    // }

    reqDoc.pdf = key;

    await reqDoc.save();

    return { message: 'updated' };
  }

  @Put('delete/object')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.USER)
  async deleteUploadObj(@Body('key') key: string) {
    this._awsS3Service.deleteS3Object(key);

    return { message: 'eliminado' };
  }

  @Put('deribar')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR)
  async deribaTramite(@User() userAuth: UserAuth, @Body() data: DerivarReqDto) {
    const { areaId, docId } = data;

    const reqDoc = await this._reqDocService.getDocById(userAuth, docId);
    // if (
    //   reqDoc.estado === StateEnum.DERIVAR ||
    //   reqDoc.estado === StateEnum.OBSERVAR
    // ) {
    //   throw new BadRequestException('El documento ya fue derivado');
    // }

    reqDoc.area.push({
      admin: userAuth.id,
      area: areaId,
      in_area_at: moment(Date.now()).tz('America/Lima').format('DD/MM/YYYY'),
    });
    reqDoc.estado = StateEnum.DERIVAR;

    const area = await this._areaService.getUserById(areaId, userAuth.tenantId);

    if (area && reqDoc.data) {
      let html = `
        <h4>Estimad@ ${area.encargado}</h4>
        <p>Tiene este documento por revisar, ${reqDoc.data.nomenclatura}, ${reqDoc.data.asunto}. </p>
        
        <a href="${reqDoc.data.principal}" style="text-align: center;">
          <img 
            title="PRINCIPAL"
            src="https://summit-dew.s3.us-east-2.amazonaws.com/email/pdf.png"
            width=75" 
            height="75">
        </a>            
      `;

      if (reqDoc.data.anexo) {
        html =
          html +
          `<a href="${reqDoc.data.anexo}" style="text-align: center;">
        <img 
          title="ANEXOS"
          src="https://summit-dew.s3.us-east-2.amazonaws.com/email/archive.png"
          width=75" 
          height="75">
      </a>
      </br>
      </br>
      <hr>
      <div style="text-align: right;">
        <p>Saludos,</br>
        Mesa de Partes Virtual</br>
        Consorcio San Miguel</p>
      </div>  `;
      } else {
        html =
          html +
          `
      </br>
      </br>
      <hr>
      <div style="text-align: right;">
        <p>Saludos,</br>
        Mesa de Partes Virtual</br>
        Consorcio SanMiguel</p>
      </div>  `;
      }

      this._nodemailder.sendEmailToWithData(
        area.email,
        'Consorcio SanMiguel - ' + reqDoc.data.asunto,
        html,
      );
    }

    await reqDoc.save();

    return { message: reqDoc };
  }

  @Put('observar')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR)
  async observarTramite(
    @User() userAuth: UserAuth,
    @Body() data: ObservacionesReqDto,
  ) {
    const { observaciones, docId } = data;

    const reqDoc = await this._reqDocService.getDocById(userAuth, docId);
    if (reqDoc.estado === StateEnum.DERIVAR) {
      throw new BadRequestException('El documento ya fue derivado');
    }

    reqDoc.observacionesRecep.push({
      admin: userAuth.id,
      description: observaciones,
      observed_at: moment(Date.now()).tz('America/Lima').format('DD/MM/YYYY'),
    });
    reqDoc.estado = StateEnum.OBSERVAR;

    await reqDoc.save();

    return { message: reqDoc };
  }

  @Put('rechazar')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR)
  async rechazarTramite(
    @User() userAuth: UserAuth,
    @Body() data: RechazadoReqDto,
  ) {
    const { docId } = data;

    const reqDoc = await this._reqDocService.getDocById(userAuth, docId);
    if (reqDoc.estado === StateEnum.DERIVAR) {
      throw new BadRequestException('El documento ya fue derivado');
    }

    reqDoc.estado = StateEnum.RECHAZADO;
    reqDoc.rechazado.push({ rechazadoPor: userAuth.id });

    await reqDoc.save();

    return { message: reqDoc };
  }

  @Get('documents')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR)
  async getDocuments(
    @User() userAuth: UserAuth,
    @Query() querys: QuerysReqDto,
  ) {
    const { limit, query, skip } = querys;
    let nQuery: { estado?: string; tenant: string } = {
      tenant: userAuth.tenantId,
    };

    if (
      query === StateEnum.DERIVAR ||
      query === StateEnum.OBSERVAR ||
      query === StateEnum.MODIFICADO ||
      query === StateEnum.RECHAZADO ||
      query === StateEnum.PENDIENTE
    ) {
      nQuery.estado = query;
    }
    const reqDoc = await this._reqDocService.getDocuments(
      nQuery,
      Number(skip),
      Number(limit),
    );
    const total = await this._reqDocService.getTotalDocuments(nQuery);

    return { data: reqDoc, total };
  }

  @Get('mydocuments')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.USER)
  async getMyDocuments(
    @User() userAuth: UserAuth,
    @Query() querys: QuerysReqDto,
  ) {
    const { limit, query, skip } = querys;
    let nQuery: { estado?: string; owner: string; tenant: string } = {
      owner: userAuth.id,
      tenant: userAuth.tenantId,
    };

    if (
      query === StateEnum.DERIVAR ||
      query === StateEnum.OBSERVAR ||
      query === StateEnum.MODIFICADO ||
      query === StateEnum.RECHAZADO ||
      query === StateEnum.PENDIENTE
    ) {
      nQuery.estado = query;
    }
    const reqDoc = await this._reqDocService.getDocuments(
      nQuery,
      Number(skip),
      Number(limit),
    );
    const total = await this._reqDocService.getTotalDocuments(nQuery);

    return { data: reqDoc, total };
  }

  @Get('document/serie/:num_serie')
  async getDocumentByNro(@Param() param: { num_serie: string }) {
    const { num_serie } = param;

    const reqDoc = await this._reqDocService.getDocByNro(num_serie); //TODO

    return { message: reqDoc };
  }

  @Get('document/:id')
  @Auth(RoleEnum.ADMINISTRADOR, RoleEnum.MODERATOR, RoleEnum.USER)
  async getDocumentById(@User() userAuth: UserAuth, @Param() param: idReqDto) {
    const { id } = param;

    const reqDoc = await this._reqDocService.getDocById(userAuth, id);

    return { message: reqDoc };
  }
}
