export class xObject implements IxObject
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