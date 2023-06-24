import { Exception } from "./Exception.ts";


export class Exception_UnintendedExecutionPath extends Exception {
  constructor(message: string, innerException: Exception | null = null) {
    super(message, innerException);
  }
}
