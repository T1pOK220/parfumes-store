export class HttpError extends Error {
status: number;
requestId?: string;

constructor(message: string, status: number, requestId?: string) {
super(message);
this.name = "HttpError";
this.status = status;
this.requestId = requestId;
}
}
