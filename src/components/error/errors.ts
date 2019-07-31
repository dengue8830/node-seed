/**
 * Most commont errors keys to use as response on an api
 * next to the correct response code.
 * Client should show the most specific error message as possible thanks to this.
 */
export enum ErrorsAPI {
  UserAlreadyExists = 'UserAlreadyExists',
  InsuficientParams = 'InsuficientParams',
  Credentials = 'Credentials',
  NotAuthorized = 'NotAuthorized',
  EmailAlreadyExists = 'EmailAlreadyExists',
  UserBlocked = 'UserBlocked',
  Unknown = 'Unknown',
  NoSenseParams = 'NoSenseParams',
  UserWithoutEmail = 'UserWithoutEmail',
  UnkownUser = 'UnkownUser',
  UserWithOutPass = 'UserWithOutPass'
}

/**
 * Clase que representa un error extendido para
 * incluir datos extras.
 * Se usa como base para otros tipos de errores
 * y tambien para usarlo directamente.
 */
export class BaseError extends Error {
  /**
   * Cualquier dato extra que pueda servir para debuggear el error.
   */
  extra?: any;
  /** Codigo legible para el usuario. hri: human readable id */
  hri?: string;

  constructor(message: string, extra?: any, hri?: string) {
    super(message);
    this.extra = extra;
    this.hri = hri;
    // Esto quita este constructor del stacktrace pero solo esta disponible en node, no browsers
    // Solo funciona cuando esta attacheado al debugger :/ sino es undefined is not a function
    // Error.captureStackTrace(this, ErrorBase);
  }
}