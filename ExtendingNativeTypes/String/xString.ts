
export class xString
{
    constructor(private str: string)
    {

    }


    
}

Object.defineProperty(Array.prototype, 'x', 
{
    get: function()
    {
        return new xString(this);
    }
});