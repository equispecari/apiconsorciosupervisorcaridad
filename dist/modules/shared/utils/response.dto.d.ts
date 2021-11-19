import { Result } from '@shared/interfaces';
export declare class ResponseDto {
    static format<T>(code: number, body: T | T[], total?: number): Result<T>;
}
