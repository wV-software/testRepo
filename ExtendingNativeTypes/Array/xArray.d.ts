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