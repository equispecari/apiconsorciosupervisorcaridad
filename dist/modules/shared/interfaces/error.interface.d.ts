export interface ErrorResponse {
    code: number;
    messageError: string;
    timestamp: string;
    path: string;
    trace?: string;
}
