export interface IRequestDAO<T> {
  rs: {
    RESULT_CODE: string;
    RESULT_DESC: string;
    MESSAGE: string;
    TOTAL_PAGE: string;
    TOTAL_RECORD: string;
    DATA: T;
  };
}
