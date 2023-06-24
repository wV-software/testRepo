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