const moment = require('moment-timezone');

interface IDia {
  inicio: string;
  fin: string;
  active: boolean;
}
interface IHorario {
  0: IDia;
  1: IDia;
  2: IDia;
  3: IDia;
  4: IDia;
  5: IDia;
  6: IDia;
}

export class HoursOfAttention {
  static getNewHour(horario: IHorario): string {
    const fechaActual = moment().utc().tz('America/lima');
    const returnformat = 'DD-MM-YYYY hh:mm:ssa';
    try {
      if (!horario) {
        return fechaActual.format(returnformat);
      }
      const format = 'hh:mm:ss';
      const dia = fechaActual.day();

      if (horario[dia].active) {
        const beforeTime = moment(horario[dia].inicio, format);
        const afterTime = moment(horario[dia].fin, format);
        if (fechaActual.isBetween(beforeTime, afterTime)) {
          return fechaActual.format(returnformat);
        } else {
          if (fechaActual < beforeTime) {
            return moment(horario[dia].inicio, format).format(returnformat);
          } else {
            const [hrInicio, addDays] = this.nextDay(horario, dia);
            if (!hrInicio) {
              return fechaActual.format(returnformat);
            } else {
              return moment(hrInicio, format)
                .add(addDays, 'days')
                .format(returnformat);
            }
          }
        }
      } else {
        const [hrInicio, addDays] = this.nextDay(horario, dia);
        if (!hrInicio) {
          return fechaActual.format(returnformat);
        } else {
          return moment(hrInicio, format)
            .add(addDays, 'days')
            .format(returnformat);
        }
      }
    } catch (error) {
      return fechaActual.format(returnformat).format(returnformat);
    }
  }

  //TEST

  // getNewHourTest(horario: IHorario,hora:string,dias:number): string {
  //   const format = 'hh:mm:ss';
  //   const fechaActual = moment(hora, format).add(dias, 'days');
  //   const returnformat = 'DD-MM-YYYY hh:mm:ssa';
  //   try {
  //     if (!horario) {
  //       return fechaActual.format(returnformat);
  //     }
  //     const format = 'hh:mm:ss';
  //     const dia = fechaActual.day();

  //     if (horario[dia].active) {
  //       const beforeTime = moment(horario[dia].inicio, format);
  //       const afterTime = moment(horario[dia].fin, format);
  //       if (fechaActual.isBetween(beforeTime, afterTime)) {
  //         return fechaActual.format(returnformat);
  //       } else {

  //         if(fechaActual<beforeTime){
  //           return moment(horario[dia].inicio, format)
  //               .format(returnformat);
  //         }else{
  //           const [hrInicio, addDays] = this.nextDay(horario, dia);
  //           if (!hrInicio) {
  //             return fechaActual.format(returnformat);
  //           } else {
  //             return moment(hrInicio, format)
  //               .add(addDays, 'days')
  //               .format(returnformat);
  //           }
  //         }
  //       }
  //     } else {
  //       const [hrInicio, addDays] = this.nextDay(horario, dia);
  //       if (!hrInicio) {
  //         return fechaActual.format(returnformat);
  //       } else {
  //         return moment(hrInicio, format)
  //           .add(addDays, 'days')
  //           .format(returnformat);
  //       }
  //     }
  //   } catch (error) {
  //     return fechaActual.format(returnformat).format(returnformat);
  //   }
  // }

  static nextDay(horario: IHorario, day: number): [string | null, number] {
    let i = 1;
    let indexDay = 0;
    let inicio: string | null = null;

    while (i < 7) {
      let index = 0;
      index = (i + day) % 7;
      if (horario[index].active) {
        indexDay = i;
        inicio = horario[index].inicio;
        i = 7;
      }
      i++;
    }
    return [inicio, indexDay];
  }
}
