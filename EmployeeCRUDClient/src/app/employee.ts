export class Employee {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    position!: string;
}

export interface PaginatedResponse<T> {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: T[];
}