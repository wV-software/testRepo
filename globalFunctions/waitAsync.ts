export class CancellationToken
{
    private _id!: number;
    private _resolve?: Function;
    isCancellationRequested = false;
    cancel()
    {
        this.isCancellationRequested = true;
        clearTimeout(this._id);
        if(this._resolve) this._resolve();
    }
}


export async function waitAsync(ms: number, cancellationToken?: CancellationToken): Promise<void>
{
    return new Promise<void>((resolve)=>
    {
        setTimeout(resolve, ms);
    });
}