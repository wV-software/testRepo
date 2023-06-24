interface IxArray<T>
{
    select<TReturn>(callbackfn: (value: T, index: number, array: T[]) => TReturn): TReturn[];

    addMany(items: T[]): void;

    selectMany<TReturn>(func: (arg: T) => TReturn[]): TReturn[];

    sort(comparer: (a: T, b: T) => number): T[];
    sortInPlace(comparer: (a: T, b: T) => number): T[];

    reverse(): T[];

    reverseInPlace(): T[];

    isAny(checker?: (arg: T) => boolean): boolean;

    areAll(checker: (arg: T) => boolean): boolean;

    isEmpty(): boolean;

    tryGetFirst(checker:(i:T)=>boolean): T|undefined;

    ensure(item: T): T;

    union(another: T[]): T[];

    removeAt(index: number): void;

    removeRange(index: number, maxCount: number): {removed: T[]};
}
declare interface Array<T>
{
    get x(): IxArray<T>;
}