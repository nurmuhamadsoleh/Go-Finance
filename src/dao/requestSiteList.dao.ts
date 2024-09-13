export interface IRequestSiteListDAO<T> {
  rsSiteList: {
    RESULT_CODE: string;
    RESULT_DESC: string;
    MESSAGE: string;
    DATA: T;
  };
}
