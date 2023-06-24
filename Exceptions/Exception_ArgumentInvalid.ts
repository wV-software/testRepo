import { Exception } from "./Exception.ts";

export class Exception_ArgumentInvalid extends Exception {
  constructor(
    public readonly argumentName: string,
    public readonly value: unknown,
    public readonly description: string,
    innerException: Exception | null = null,
  ) {
    super(
      `Invalid argument: {${argumentName} = ${value}} is invalid.\r\n${description}`,
      innerException,
    );
  }
}
