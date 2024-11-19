export type Pagination<T> = {
  forEach(arg0: (member: import("./client").FamilyMember, index: any) => void): unknown;
  length: number;
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[]
}
