// define the extenstion interface
interface IString
{
    xRange(range:{start: number, end?:number}|
        {start: number, count?: number}): string;

    xReplaceRange(range:{start: number, end:number}|{start: number, count: number}, replacement: string): string;

    xEncodeToBase64(): string;

    xDecodeBase64(): string;
}


declare interface String extends IString
{
    
}