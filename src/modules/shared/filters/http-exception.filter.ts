import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorResponse } from '@shared/interfaces';
import { Request, Response } from 'express';
import { ResponseDto } from '../utils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const messageError = error.message;

    response.status(status).json(
      ResponseDto.format<ErrorResponse>(status, {
        code: status,
        messageError: messageError,
        timestamp: new Date().toISOString(),
        path: request.url,
      }),
    );
  }
}
