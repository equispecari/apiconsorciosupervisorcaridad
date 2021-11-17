export interface BaseRepository<T> {
  getOne(id: number | string): Promise<T>;
  getPage(page: number, limit: number): Promise<{ data: T[]; total: number }>;
  update(id: number | string, entity: Partial<T>): Promise<T>;
  delete(id: number | string): Promise<T>;
  list(options?: {
    where?: object;
    relations?: string[];
    filter?: object;
    sort?: object;
    skip?: number;
    limit?: number;
  }): Promise<T[]>;
  create(entity: Partial<T>): Promise<T>;
}
