export interface BaseRepositoryInterface<T> {
  findAllWithPagination(limit: number, offset: number): Promise<[T[], number]>;
}
