export interface BaseRepositoryInterface<T> {
  findAll(): Promise<T[]>;
}
