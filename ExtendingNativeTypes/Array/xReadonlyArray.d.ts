interface IxReadonlyArray<T>
{
    remodel<TReturn>(callbackfn: (value: T, index: number, array: T[]) => TReturn): TReturn[];
    remodelToMany<TReturn>(func: (arg: T) => TReturn[]): TReturn[];
    sort(comparer: (a: T, b: T) => number): T[];
    reverse(): T[];
    isAny(checker?: (arg: T) => boolean): boolean;
    areAll(checker: (arg: T) => boolean): boolean;
    isEmpty(): boolean;
    first(checker: (i: T) => boolean): T | undefined;
    last(checker: (i:T)=>boolean): T|undefined;
    except(another: T[]): T[];
    intersect(another: T[]): T[];
    intersects(another: T[]): boolean;
    clone(): T[];
    contains(item: T): boolean;
    toMap<TKey>(keySelector: (item: T)=>TKey, distinctItems:boolean): Map<TKey, T[]>;
}

declare interface ReadonlyArray<T>
{
    get x(): IxReadonlyArray<T>;
}