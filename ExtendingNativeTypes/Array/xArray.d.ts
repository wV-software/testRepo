interface IxReadonlyArray<T>
{
    // turnTo<TReturn>(callbackfn: (value: T, index: number, array: T[]) => TReturn): TReturn[];
    
    add(item: T): void;
    mapToMany<TReturn>(func: (arg: T) => TReturn[]): TReturn[];
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
    where(checker: (arg: T, index?: number) => boolean): T[];
}

declare interface ReadonlyArray<T>
{
    get x(): IxReadonlyArray<T>;
}
interface IxArray<T> extends IxReadonlyArray<T>
{
    insert(index: number, ...items: T[]): void;

    sortInPlace(comparer: (a: T, b: T) => number): T[];

    reverseInPlace(): T[];

    ensure(item: T): T;

    union(another: T[]): T[];


    reset(): void;

    replaceRange(range: { start: number; end: number; } | { start: number; count: number; }, replacement: T[]): {removed: T[]}
    removeAt(index: number): { removed: T[] };
}
declare interface Array<T>
{
    get x(): IxArray<T>;
}