
// implement extension interface while inheriting the intrinsic class to have access to 
// its intrinsic members
class ObjectX extends Object implements IObject
{
    toMap(): Map<string, unknown>
    {
        const output = new Map<string, unknown>(Object.entries(this));
        return output;
    }
}



// Assign the description of the added properties to the intrinsic type
const srcProto = ObjectX.prototype;
const dstProto = Object.prototype;
const props = Object.getOwnPropertyNames(srcProto);
for (const prop of props)
{
    if (prop === 'constructor') continue;

    const addedProp = Object.getOwnPropertyDescriptor(srcProto, prop);
    Object.defineProperty(dstProto, prop, addedProp!);
}