export class Exception extends Error
{
  constructor(message: string, public readonly innerException: Exception | null = null)
  {
    super(message);
    this.logError();
  }

  static FromError(error: Error): Exception
  {
    return new Exception(error.message);
  }

  logError()
  {
    this.innerException?.logError();
    console.error(this.message);
    console.error(this.stack);
  }
}
