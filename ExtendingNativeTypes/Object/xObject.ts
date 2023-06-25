export class xObject implements Object
{
    constructor(private _obj: Object)
    {

    }
    toMap(): Map<string, unknown>
    {
        const output = new Map<string, unknown>(Object.entries(this._obj));
        return output;
    }

}