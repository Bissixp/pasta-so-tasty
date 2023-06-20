export default class ErrorHttp extends Error {
  public http: number;
  constructor(message: string, http: number) {
    super(message);
    this.http = http;
  }
}