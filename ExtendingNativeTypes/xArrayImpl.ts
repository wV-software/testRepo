import { Exception_InvalidOperation } from "../Exceptions/Exception_InvalidOperation.ts";

Object.defineProperty(Array.prototype, 'x', 
{
    get: function()
    {
        return new xArrayImpl<any>(this);
    }
});


export class xArrayImpl<T>
{
    constructor(private array: Array<T>)
    {

    }

    select<TReturn>(callbackfn: (value: T, index: number, array: T[]) => TReturn): TReturn[]
    {
        return this.array.map(callbackfn);
    }

    addMany(items: T[])
    {
        if (!items) return;

        if (items.constructor === Array)
        {
            this.array.push(...items);
        }
        else
        {
            this.array.push(...items);
        }
    }

    selectMany<TReturn>(func: (arg: T) => TReturn[]): TReturn[]
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

    tryGetFirst(checker:(i:T)=>boolean): T|undefined
    {
        for(const item of this.array)
        {
            if(checker(item)) return item;
        }

        return undefined;
    }

    ensure(item: T): T
    {
        const first = this.tryGetFirst(i => i === item);
        if(first) return first;
        
        this.array.push(item);
        return item;
    }

    union(another: T[]): T[]
    {
        return [...this.array, ...another];
    }

    removeAt(index: number): void
    {
        if(index <0 || index>this.array.length)
        {
            throw new Exception_InvalidOperation(`index out of range`);
        }

        this.array.splice(index, 1);
    }

    removeRange(index: number, maxCount: number): {removed: T[]}
    {
        const output = {removed: this.array.splice(index, maxCount)};
        return output;
    }
}