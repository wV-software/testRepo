export function isPrimitive(obj: any)
{
    if(obj == null) { return true; }
    return new Object(obj) !== obj;
}