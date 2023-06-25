
Object.prototype.toMap = function(): Map<string, unknown>
{
    const output = new Map<string, unknown>(Object.entries(this));
    return output;
}
