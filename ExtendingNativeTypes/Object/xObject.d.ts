
// define the extenstion interface
interface IObject
{
    toMap(): Map<string, unknown>;
}


// merge extension interface with the intrinsic interface
declare interface Object extends IObject
{
    
}
