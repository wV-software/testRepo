import { Exception_ArgumentInvalid } from "../../Exceptions/Exception_ArgumentInvalid.ts";
import { Exception_InvalidOperation } from "../../Exceptions/Exception_InvalidOperation.ts";
import { Exception_UnintendedExecutionPath } from "../../Exceptions/Exception_UnintendedExecutionPath.ts";

// implement extension interface while inheriting the intrinsic class to have access to 
// its intrinsic members
export class ArrayX<T> extends Array<T> implements IArray<T>
{
    constructor() { super(); }
    xAdd(...items: T[]): void
    {
        this.push(...items);
    }

    get xCount(): number
    {
        return this.length;
    }

    xClone(): T[]
    {
        return [...this];
    }

    xSelect<TReturn>(func: (item: T, index?: number, items?: T[]) => TReturn): TReturn[]
    {
        return this.map(func);
    }

    xSelectMany<TReturn>(func: (arg: T) => TReturn[]): TReturn[]
    {
        const result: TReturn[] = [];

        for (let x = 0; x < this.length; x++)
        {
            const itemResult: TReturn[] = func((this[x]) as unknown as T);
            if (itemResult != null) 
            {
                result.push(...itemResult);
            }
            // throw `@[List.SelectMany(func) func returned undefined value!]`;
        }
        return result;
    }

    xWhere(checker: (arg: T, index?: number) => boolean): T[]
    {
        return this.filter((item, index) => checker(item, index));
    }

    xInsert(index: number, ...items: T[])
    {
        if (index < 0 || index > this.length)
        {
            throw new Exception_InvalidOperation(`index out of range`);
        }

        if (items.length === 0) return;

        this.splice(index, 0, ...items);
    }

    xSort(comparer: (a: T, b: T) => number): T[]
    {
        const copy = [...this];
        copy.sort(comparer);
        return copy;
    }

    xSortInPlace(comparer: (a: T, b: T) => number): T[]
    {
        this.sort(comparer);
        return this;
    }

    reverse(): T[]
    {
        return [...this].reverse();
    }
    xReverseInPlace(): T[]
    {
        this.reverse();
        return this;
    }

    xIsAny(checker?: (arg: T) => boolean): boolean
    {
        if (checker == null) return this.length > 0;

        for (let x = 0; x < this.length; x++)
        {
            if (checker(this[x] as T) === true)
            {
                return true;
            }
        }
        return false;
    }

    xAreAll(checker: (arg: T) => boolean)
    {
        for (const item of this)
        {
            if (!checker(item)) return false;
        }

        return true;
    }

    xIsEmpty(): boolean
    {
        return this.length === 0;
    }
    xFirst(checker?: (i: T) => boolean): T | undefined
    {
        if (this.length === 0) return undefined;
        if (!checker) return this[0];

        for (const item of this)
        {
            if (checker(item)) return item;
        }

        return undefined;
    }
    xFirstIndex(checker: (i: T) => boolean): number 
    {
        for (let x = 0; x < this.length; x++)
        {
            if (checker(this[x])) return x;
        }

        return -1;
    }
    lastIndex(checker: (i: T) => boolean): number 
    {
        for (let x = this.length - 1; x >= 0; x--)
        {
            if (checker(this[x])) return x;
        }

        return -1;
    }

    xLast(checker?: (i: T) => boolean): T | undefined
    {
        if (this.length === 0) return undefined;
        if (!checker) return this[this.length - 1];

        for (let x = this.length - 1; x > -1; x--)
        {
            if (checker(this[x])) return this[x];
        }

        return undefined;
    }
    xEnsure(item: T): T
    {
        const first = this.xFirst(i => i === item);
        if (first) return first;

        this.push(item);
        return item;
    }
    xUnion(another: T[]): T[]
    {
        return [...this, ...another];
    }
    xRemoveAt(index: number): { removed: T[] }
    {
        if (index < 0 || index >= this.length)
        {
            throw new Exception_InvalidOperation(`index out of range`);
        }

        const output = { removed: this.splice(index, 1) };
        return output;
    }
    xExcept(another: T[]): T[]
    {
        let result: T[] = [];

        for (const item of this)
        {
            if (!another.xIsAny(i => i === item) === false)
            {
                result.push(item);
            }
        }

        return result;
    }
    xIntersect(another: T[]): T[]
    {
        const output: T[] = [];
        for (const item1 of this)
        {
            for (const item2 of another)
            {
                if (item1 === item2)
                {
                    output.push(item1);
                    break;
                }
            }
        }

        return output;
    }
    xIntersects(another: T[]): boolean
    {
        for (const item1 of this)
        {
            for (const item2 of another)
            {
                if (item1 === item2)
                {
                    return true;
                }
            }
        }

        return false;
    }
    xReset(): void
    {
        this.length = 0;
    }

    xReplaceRange(range: { start: number; end: number; } | { start: number; count: number; }, replacement: T[]): { removed: T[] }
    {
        if (range.start < 0 || range.start >= this.length)
        {
            throw new Exception_ArgumentInvalid('range.start', range.start, 'index out of range');
        }
        if (Object.hasOwn(range, 'end'))
        {
            const end = (range as { end: number }).end;
            if (end < -1 || end >= this.length || end < range.start)
            {
                throw new Exception_ArgumentInvalid('range.end', range.start, 'index out of range');
            }

            const count = end - range.start + 1;
            const removed = [...this].splice(range.start, count, ...replacement);
            return { removed };
        }
        else if (Object.hasOwn(range, 'count'))
        {
            const count = (range as { count: number }).count;
            if (count < 0 || range.start + count >= this.length)
            {
                throw new Exception_ArgumentInvalid('range.end', range.start, 'index out of range');
            }

            const removed = [...this].splice(range.start, count, ...replacement);
            return { removed };
        }
        else
        {
            throw new Exception_UnintendedExecutionPath(``);
        }
    }

    xRemoveWhere(selector: (item: T) => boolean): { removed: T[] }
    {
        const removed: T[] = [];
        for (let x = 0; x < this.length; x++)
        {
            const item = this[x];
            if (selector(item))
            {
                removed.push(item);
                this.xRemoveAt(x);
                x--;
            }
        }

        return { removed };
    }

    xToMap<TKey>(keySelector: (item: T) => TKey, distinctItems: boolean): Map<TKey, T[]>
    {
        const map = new Map<TKey, T[]>();
        for (let item of this)
        {
            const key = keySelector(item);
            let keyItems: T[];
            if (map.has(key))
            {
                keyItems = map.get(key)!;
                keyItems.push(item);
            }
            else
            {
                keyItems = [];
                keyItems.push(item);
                map.set(key, keyItems);
            }
        }
        return map;
    }

    xContains(item: T): boolean
    {
        return !!this.xFirst(i => i === item);
    }
    xDistinct(): T[]
    {
        const output: T[] = [];
        const clone = [...this];
        while (clone.length > 0)
        {
            const { removed } = clone.xRemoveWhere(i => i === clone[0]);
            output.push(removed[0]);
        }
        return output;
    }
}

// Assign the description of the added properties to the intrinsic type
const srcProto = ArrayX.prototype;
const dstProto = Array.prototype;
const props = Object.getOwnPropertyNames(srcProto);
for (const prop of props)
{
    if (prop === 'constructor') continue;

    const addedProp = Object.getOwnPropertyDescriptor(srcProto, prop);
    Object.defineProperty(dstProto, prop, addedProp!);
}