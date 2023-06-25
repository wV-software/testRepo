import { Exception_ArgumentInvalid } from "../../Exceptions/Exception_ArgumentInvalid.ts";
import { xObject } from "../Object/xObject.ts";

export class KeyValuePair<TKey, TValue>
{
    public Key:TKey;
    public Value:TValue; 

    constructor(key: TKey, value:TValue)
    {
        this.Key = key;
        this.Value = value;
    }
}


type actionOnKeyValue<TKey, TValue> = (kv:KeyValuePair<TKey, TValue>) => void; 

export class xMap<K, V> implements IxMap<K, V> 
{ 
    constructor(private _map: Map<K, V>) { }

    public add(key:K, value:V):void
    {
        if(this._map.has(key)) 
        throw new Exception_ArgumentInvalid('key', key, `The Map aleardy has the specified key: ${key}`);     
        this._map.set(key, value);
    }

    public ensure(key:K, value:V, overwriteIfExising: boolean = false): V
    {
        if(this._map.has(key))
        {
            if(overwriteIfExising)
            {
                this._map.set(key, value);
                return value;
            }
            else
            {
                return this._map.get(key) as V;
            }
        }
        else
        {
            this._map.set(key, value);
            return value;
        }
    }

    public removeIfAny(key:K): {removedItem: V|undefined}
    {
        const output = {removedItem: this._map.get(key)};
        this._map.delete(key);
        return output;
    }

    get keys(): K[]
    {
        return Array.from(this._map.keys());
    }

    get values(): V[]
    {
        return Array.from(this._map.values());
    }

    clear(): void
    {
        this._map.clear();
    }

    containsKey(key:K): boolean
    {
        for(let k of this._map.keys())
        {
            if(key === k) return true;
        }

        return false;
    }

    get length(): number
    {
        return this._map.size;
    }

    isAny(checker?:(kv: KeyValuePair<K, V>)=>boolean): boolean
    {
        if(!checker) return this._map.size > 0;

        for(let entry of this._map.entries())
        {
            const kv = new KeyValuePair<K, V>(entry[0] as K, entry[1] as V);
            if(checker(kv)) return true;
        }

        return false;
    }
}

Object.defineProperty(Array.prototype, 'x',
    {
        get: function ()
        {
            return new xObject(this);
        }
    });