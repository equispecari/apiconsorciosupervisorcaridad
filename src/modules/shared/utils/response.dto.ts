import { Result } from '@shared/interfaces';

export class ResponseDto {
  static format<T>(
    code: number,
    body: T | T[],
    total: number = null,
  ): Result<T> {
    if (total) {
      return { code, body, total };
    } else {
      return { code, body };
    }
  }
}
