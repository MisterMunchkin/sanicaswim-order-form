export class RouteApiError extends Error {
  private _statusCode: number;
  get statusCode(): number {
    return this._statusCode;
  }
  set statusCode(value: number) {
    this._statusCode = value
  }

  private _friendlyMsg: string
  get friendlyMsg(): string {
    return this._friendlyMsg;
  }
  set friendlyMsg(value: string) {
    this._friendlyMsg = value;
  }
  
  constructor(msg: string, friendlyMsg: string, statusCode: number) {
    super(msg);
    this._statusCode = statusCode;
    this._friendlyMsg = friendlyMsg;
    Object.setPrototypeOf(this, RouteApiError.prototype);
  }
}
