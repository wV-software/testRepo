import { Exception } from "./Exception.ts";


export class Exception_ArgumentNull extends Exception
{
  argumentName!: string;

  constructor(argumentName: string, message: string | null = null, innerException: Exception | null = null)
  {
    super(message ?? `Argument '${argumentName}' cannot be null!`, innerException);
    this.argumentName = argumentName;
  }
}
