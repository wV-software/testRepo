import { Exception } from "./Exception.ts";


export class Exception_InvalidProgramState extends Exception {
  constructor(invalidVarName: string,
    public readonly description: string,
    innerException: Exception | null = null) {
    super(`Invalid program state at var:[${invalidVarName}]\r\n ${description}`, innerException);
  }
}
