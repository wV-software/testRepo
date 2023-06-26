// define the extenstion interface
interface IReadonlyArray<T>
{
    // turnTo<TReturn>(callbackfn: (value: T, index: number, array: T[]) => TReturn): TReturn[];
    xSelect<TReturn>(func: (arg: T)=>TReturn): TReturn[];
    xSelectMany<TReturn>(func: (arg: T) => TReturn[]): TReturn[];
    xSort(comparer: (a: T, b: T) => number): T[];
    reverse(): T[];
    xIsAny(checker?: (arg: T) => boolean): boolean;
    xAreAll(checker: (arg: T) => boolean): boolean;
    xIsEmpty(): boolean;
    xFirst(checker?: (i: T) => boolean): T | undefined;
    xFirstIndex(checker: (i: T) => boolean): number;
    xLast(checker?: (i:T)=>boolean): T|undefined;
    xExcept(another: T[]): T[];
    xIntersect(another: T[]): T[];
    xIntersects(another: T[]): boolean;
    xClone(): T[];
    xContains(item: T): boolean;
    xDistinct(): T[];
    xToMap<TKey>(keySelector: (item: T)=>TKey, distinctItems:boolean): Map<TKey, T[]>;
    xWhere(checker: (arg: T, index?: number) => boolean): T[];
}

// merge extension interface with the intrinsic interface
declare interface ReadonlyArray<T> extends IReadonlyArray<T>
{
    
}

// define the extension interface
interface IArray<T> extends IReadonlyArray<T>
{
    get xCount(): number;

    xAdd(...items: T[]): void;
    xInsert(index: number, ...items: T[]): void;

    xSortInPlace(comparer: (a: T, b: T) => number): T[];

    xReverseInPlace(): T[];

    xEnsure(item: T): T;

    xUnion(another: T[]): T[];


    xReset(): void;

    xReplaceRange(range: { start: number; end: number; } | { start: number; count: number; }, replacement: T[]): {removed: T[]}
    xRemoveAt(index: number): { removed: T[] };

    xRemoveWhere(selector: (item: T)=>boolean): {removed: T[]}
}

// merge extension interface with the intrinsic interface
declare interface Array<T> extends IArray<T>
{
    
}