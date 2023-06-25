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

export class xMap<TKey, TValue> implements IxMap<TKey, TValue> 
{ 
    constructor(private _map: Map<TKey, TValue>) { }

    public add(key:TKey, value:TValue):void
    {
        if(this._map.has(key)) 
        throw new Exception_ArgumentInvalid('key', key, `The Map aleardy has the specified key: ${key}`);     
        this._map.set(key, value);
    }

    public ensure(key:TKey, value:TValue, overwriteIfExising: boolean = false): TValue
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
                return this._map.get(key) as TValue;
            }
        }
        else
        {
            this._map.set(key, value);
            return value;
        }
    }

    public removeIfAny(key:TKey): {removedItem: TValue|undefined}
    {
        const output = {removedItem: this._map.get(key)};
        this._map.delete(key);
        return output;
    }

    get keys(): TKey[]
    {
        return Array.from(this._map.keys());
    }

    get values(): TValue[]
    {
        return Array.from(this._map.values());
    }

    clear(): void
    {
        this._map.clear();
    }

    containsKey(key:TKey): boolean
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
}

Object.defineProperty(Array.prototype, 'x',
    {
        get: function ()
        {
            return new xObject(this);
        }
    });