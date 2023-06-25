import { Exception_ArgumentInvalid } from "../../Exceptions/Exception_ArgumentInvalid.ts";
import { Exception_InvalidOperation } from "../../Exceptions/Exception_InvalidOperation.ts";
import { Exception_UnintendedExecutionPath } from "../../Exceptions/Exception_UnintendedExecutionPath.ts";
export class xArray<T> implements IxArray<T>
{
    constructor(private array: Array<T>) { }

    clone(): T[]
    {
        return [...this.array];
    }

    remodel<TReturn>(callbackfn: (value: T, index: number, array: T[]) => TReturn): TReturn[]
    {
        return this.array.map(callbackfn);
    }

    remodelToMany<TReturn>(func: (arg: T) => TReturn[]): TReturn[]
    {
        const result: TReturn[] = [];

        for (let x = 0; x < this.array.length; x++)
        {
            const itemResult: TReturn[] = func((this.array[x]) as unknown as T);
            if (itemResult != null) 
            {
                result.push(...itemResult);
            }
            // throw `@[List.SelectMany(func) func returned undefined value!]`;
        }
        return result;
    }


    insert(index: number, ...items: T[])
    {
        if (index < 0 || index > this.array.length)
        {
            throw new Exception_InvalidOperation(`index out of range`);
        }

        if (items.length === 0) return;

        this.array.splice(index, 0, ...items);
    }

    sort(comparer: (a: T, b: T) => number): T[]
    {
        const copy = [...this.array];
        copy.sort(comparer);
        return copy;
    }

    sortInPlace(comparer: (a: T, b: T) => number): T[]
    {
        this.array.sort(comparer);
        return this.array;
    }

    reverse(): T[]
    {
        return [...this.array].reverse();
    }
    reverseInPlace(): T[]
    {
        this.array.reverse();
        return this.array;
    }

    isAny(checker?: (arg: T) => boolean): boolean
    {
        if (checker == null) return this.array.length > 0;

        for (let x = 0; x < this.array.length; x++)
        {
            if (checker(this.array[x] as T) === true)
            {
                return true;
            }
        }
        return false;
    }

    areAll(checker: (arg: T) => boolean)
    {
        for (const item of this.array)
        {
            if (!checker(item)) return false;
        }

        return true;
    }

    isEmpty(): boolean
    {
        return this.array.length === 0;
    }
    first(checker: (i: T) => boolean): T | undefined
    {
        for (const item of this.array)
        {
            if (checker(item)) return item;
        }

        return undefined;
    }
    last(checker: (i: T) => boolean): T | undefined
    {
        for (let x = this.array.length - 1; x > -1; x--)
        {
            if (checker(this.array[x])) return this.array[x];
        }

        return undefined;
    }
    ensure(item: T): T
    {
        const first = this.first(i => i === item);
        if (first) return first;

        this.array.push(item);
        return item;
    }
    union(another: T[]): T[]
    {
        return [...this.array, ...another];
    }
    removeAt(index: number): { removed: T[] }
    {
        if (index < 0 || index >= this.array.length)
        {
            throw new Exception_InvalidOperation(`index out of range`);
        }

        const output = { removed: this.array.splice(index, 1) };
        return output;
    }
    except(another: T[]): T[]
    {
        let result: T[] = [];

        for (const item of this.array)
        {
            if (!another.x.isAny(i => i === item) === false)
            {
                result.push(item);
            }
        }

        return result;
    }
    intersect(another: T[]): T[]
    {
        const output: T[] = [];
        for (const item1 of this.array)
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
    intersects(another: T[]): boolean
    {
        for (const item1 of this.array)
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
    reset(): void
    {
        this.array.length = 0;
    }

    replaceRange(range: { start: number; end: number; } | { start: number; count: number; }, replacement: T[]): { removed: T[] }
    {
        if (range.start < 0 || range.start >= this.array.length)
        {
            throw new Exception_ArgumentInvalid('range.start', range.start, 'index out of range');
        }
        if (Object.hasOwn(range, 'end'))
        {
            const end = (range as { end: number }).end;
            if (end < -1 || end >= this.array.length || end < range.start)
            {
                throw new Exception_ArgumentInvalid('range.end', range.start, 'index out of range');
            }

            const count = end - range.start + 1;
            const removed = [...this.array].splice(range.start, count, ...replacement);
            return { removed };
        }
        else if (Object.hasOwn(range, 'count'))
        {
            const count = (range as { count: number }).count;
            if (count < 0 || range.start + count >= this.array.length)
            {
                throw new Exception_ArgumentInvalid('range.end', range.start, 'index out of range');
            }

            const removed = [...this.array].splice(range.start, count, ...replacement);
            return { removed };
        }
        else
        {
            throw new Exception_UnintendedExecutionPath(``);
        }
    }

    toMap<TKey>(keySelector: (item: T) => TKey, distinctItems: boolean): Map<TKey, T[]>
    {
        const map = new Map<TKey, T[]>();
        for (let item of this.array)
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

    contains(item: T): boolean
    {
        return !!this.first(i => i === item);
    }
}


Object.defineProperty(Array.prototype, 'x',
    {
        get: function ()
        {
            return new xArray<any>(this);
        }
    });