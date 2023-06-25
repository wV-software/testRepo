interface IxString
{
    range(range:{start: number, end?:number}|
        {start: number, count?: number}): string;

    replaceRange(range:{start: number, end:number}|{start: number, count: number}, replacement: string): string;

    encodeToBase64(): string;

    decodeBase64(): string
}


declare interface String
{
    get x(): IxString;
}