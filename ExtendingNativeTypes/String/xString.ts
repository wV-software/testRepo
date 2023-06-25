import { Exception_ArgumentInvalid } from "../../Exceptions/Exception_ArgumentInvalid.ts";
import { Exception_InvalidOperation } from "../../Exceptions/Exception_InvalidOperation.ts";
import { Exception_UnintendedExecutionPath } from "../../Exceptions/Exception_UnintendedExecutionPath.ts";

export class xString implements IxString
{
    constructor(private str: string) { }
    range(range: { start: number, end: number } |
    { start: number, count: number }): string
    {
        if (range.start < 0 || range.start >= this.str.length)
        {
            throw new Exception_ArgumentInvalid('range.start', range.start, 'index out of range');
        }
        if (Object.hasOwn(range, 'end'))
        {
            const end = (range as { end: number }).end;
            if (end < -1 || end >= this.str.length || end < range.start)
            {
                throw new Exception_ArgumentInvalid('range.end', range.start, 'index out of range');
            }

            return this.str.substring(range.start, end + 1);
        }
        else if (Object.hasOwn(range, 'count'))
        {
            const count = (range as { count: number }).count;
            if (count < 0 || range.start + count >= this.str.length)
            {
                throw new Exception_ArgumentInvalid('range.end', range.start, 'index out of range');
            }

            return this.str.substring(range.start, range.start + count);
        }
        else
        {
            return this.str.substring(range.start);
        }
    }

    replaceRange(range: { start: number, end: number } | { start: number, count: number }, replacement: string): string 
    {
        if (range.start < 0 || range.start >= this.str.length)
        {
            throw new Exception_ArgumentInvalid('range.start', range.start, 'index out of range');
        }
        if (Object.hasOwn(range, 'end'))
        {
            const end = (range as { end: number }).end;
            if (end < -1 || end >= this.str.length || end < range.start)
            {
                throw new Exception_ArgumentInvalid('range.end', range.start, 'index out of range');
            }

            const left = this.str.substring(0, range.start);
            const right = this.str.substring(end + 1);

            return `${left}${replacement}${right}`;
        }
        else if (Object.hasOwn(range, 'count'))
        {
            const count = (range as { count: number }).count;
            if (count < 0 || range.start + count >= this.str.length)
            {
                throw new Exception_ArgumentInvalid('range.end', range.start, 'index out of range');
            }

            const left = this.str.substring(0, range.start);
            const right = this.str.substring(range.start + count);

            return `${left}${replacement}${right}`;
        }
        else
        {
            throw new Exception_UnintendedExecutionPath(``);
        }
    }

    encodeToBase64(): string
    {
        return btoa(this.str);
    }

    decodeBase64(): string
    {
        return atob(this.str);
    }
}




Object.defineProperty(String.prototype, 'x',
    {
        get: function ()
        {
            return new xString(this);
        }
    });
