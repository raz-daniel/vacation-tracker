export default interface Pagination<T> {
    vacations: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}