
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

interface IxArray<T> extends IxReadonlyArray<T>
{
    addMany(items: T[]): void;

    sortInPlace(comparer: (a: T, b: T) => number): T[];

    reverseInPlace(): T[];

    ensure(item: T): T;

    union(another: T[]): T[];

    removeAt(index: number): void;

    removeRange(index: number, maxCount: number): { removed: T[] };
}
declare interface Array<T>
{
    get x(): IxArray<T>;
}