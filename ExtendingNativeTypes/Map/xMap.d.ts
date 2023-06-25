interface IKeyValuePair<TKey, TValue> {
    Key: TKey;
    Value: TValue;
}

interface IxMap<TKey, TValue> {
    readonly keys: TKey[];
    readonly values: TValue[];
    readonly length: number;
    add(key: TKey, value: TValue): void;
    ensure(key: TKey, value: TValue, overwriteIfExising: boolean): TValue;
    removeIfAny(key: TKey): { removedItem: TValue|undefined; };
    clear(): void;
    containsKey(key: TKey): boolean;
}
declare interface Map<K,V>
{
    get x(): IxMap<K, V>;
}