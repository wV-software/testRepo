declare interface IxObject
{
    toMap(): Map<string, unknown>;
}

declare interface Object
{
    get x(): IxObject;
}