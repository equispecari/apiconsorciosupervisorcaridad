export interface Result<T> {
  code: number;
  body: T | T[];
  total?: number;
}
