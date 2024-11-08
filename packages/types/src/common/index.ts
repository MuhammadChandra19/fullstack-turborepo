export type HelloType = {
  content: string;
};

export enum TodoType {
  DONE = 'done',
  IN_PROGRESS = 'in_progress',
  DEFERRED = 'deferred',
}

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};
