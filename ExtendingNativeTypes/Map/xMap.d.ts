declare interface IKeyValuePair<TKey, TValue>
{
    Key: TKey;
    Value: TValue;
}

// define the extenstion interface
declare interface IMap<K, V>
{
    get xCount(): number;
    get xKeys(): K[];
    get xValues(): V[];
    readonly xLength: number;
    xAdd(key: K, value: V): void;
    xEnsure(key: K, value: V, overwriteIfExising: boolean): V;
    xRemoveIfAny(key: K): { removedItem: V | undefined; };
    xClear(): void;
    xContainsKey(key: K): boolean;
    xIsAny(checker?: (kv: IKeyValuePair<K, V>) => boolean): boolean;
}

// merge extension interface with the intrinsic interface
declare interface Map<K, V> extends IMap<K, V>
{

}