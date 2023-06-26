import { Exception_ArgumentInvalid } from "../../Exceptions/Exception_ArgumentInvalid.ts";

export class KeyValuePair<TKey, TValue>
{
    public Key: TKey;
    public Value: TValue;

    constructor(key: TKey, value: TValue)
    {
        this.Key = key;
        this.Value = value;
    }
}

// implement extension interface while inheriting the intrinsic class to have access to 
// its intrinsic members
export class MapX<K, V> extends Map<K, V> implements IMap<K, V>
{
    constructor(iterable: Iterable<[K, V]>) { super(iterable); }

    public xAdd(key: K, value: V): void
    {
        if (this.has(key))
            throw new Exception_ArgumentInvalid('key', key, `The Map aleardy has the specified key: ${key}`);
        this.set(key, value);
    }

    get xCount(): number
    {
        return this.size;
    }

    public xEnsure(key: K, value: V, overwriteIfExising: boolean = false): V
    {
        if (this.has(key))
        {
            if (overwriteIfExising)
            {
                this.set(key, value);
                return value;
            }
            else
            {
                return this.get(key) as V;
            }
        }
        else
        {
            this.set(key, value);
            return value;
        }
    }

    public xRemoveIfAny(key: K): { removedItem: V | undefined }
    {
        const output = { removedItem: this.get(key) };
        this.delete(key);
        return output;
    }

    xKeys(): K[]
    {
        return Array.from(this.keys());
    }

    xValues(): V[]
    {
        return Array.from(this.values());
    }

    xClear(): void
    {
        this.clear();
    }

    xContainsKey(key: K): boolean
    {
        for (let k of this.keys())
        {
            if (key === k) return true;
        }

        return false;
    }

    get xLength(): number
    {
        return this.size;
    }

    xIsAny(checker?: (kv: KeyValuePair<K, V>) => boolean): boolean
    {
        if (!checker) return this.size > 0;

        for (let entry of this.entries())
        {
            const kv = new KeyValuePair<K, V>(entry[0] as K, entry[1] as V);
            if (checker(kv)) return true;
        }

        return false;
    }
}

// Assign the description of the added properties to the intrinsic type
const srcProto = MapX.prototype;
const dstProto = Map.prototype;
const props = Object.getOwnPropertyNames(srcProto);
for (const prop of props)
{
    if (prop === 'constructor') continue;

    const addedProp = Object.getOwnPropertyDescriptor(srcProto, prop);
    Object.defineProperty(dstProto, prop, addedProp!);
}
