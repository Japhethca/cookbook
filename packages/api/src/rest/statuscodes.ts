import http from 'http';

export const STATUS_OK = 200;
export const STATUS_CREATED = 201;
export const STATUS_NO_CONTENT = 204;
export const STATUS_MOVED_PERMANENTLY = 301;
export const STATUS_TEMPORAL_REDIRECT = 307;
export const STATUS_PERMANENT_REDIRECT = 308;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_UNAUTHORIZED = 401;
export const STATUS_FORBIDDEN = 403;
export const STATUS_NOT_FOUND = 404;
export const STATUS_METHOD_NOT_ALLOWED = 405;
export const STATUS_CONFLICT = 409;
export const STATUS_INTERNAL_SERVER_ERROR = 500;
export const STATUS_NOT_IMPLEMENTED = 501;

export const statusText = (code: number) => http.STATUS_CODES[code];
