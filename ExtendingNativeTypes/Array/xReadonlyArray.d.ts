interface IxReadonlyArray<T>
{
    select<TReturn>(callbackfn: (value: T, index: number, array: T[]) => TReturn): TReturn[];
    selectMany<TReturn>(func: (arg: T) => TReturn[]): TReturn[];
    sort(comparer: (a: T, b: T) => number): T[];
    reverse(): T[];
    isAny(checker?: (arg: T) => boolean): boolean;
    areAll(checker: (arg: T) => boolean): boolean;
    isEmpty(): boolean;
    tryGetFirst(checker: (i: T) => boolean): T | undefined;
}

declare interface ReadonlyArray<T>
{
    get y(): IxReadonlyArray<T>;
}