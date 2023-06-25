interface IKeyValuePair<TKey, TValue> {
    Key: TKey;
    Value: TValue;
}

interface IxMap<K, V> {
    get keys(): K[];
    get values(): V[];
    readonly length: number;
    add(key: K, value: V): void;
    ensure(key: K, value: V, overwriteIfExising: boolean): V;
    removeIfAny(key: K): { removedItem: V|undefined; };
    clear(): void;
    containsKey(key: K): boolean;
    isAny(checker?:(kv: IKeyValuePair<K, V>)=>boolean): boolean;
}
declare interface Map<K,V>
{
    get x(): IxMap<K, V>;
}