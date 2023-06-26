import { Exception_ArgumentInvalid } from "../../Exceptions/Exception_ArgumentInvalid.ts";
import { Exception_UnintendedExecutionPath } from "../../Exceptions/Exception_UnintendedExecutionPath.ts";

// implement extension interface while inheriting the intrinsic class to have access to 
// its intrinsic members
class StringX extends String implements IString
{
    xRange(range: { start: number, end: number } |
    { start: number, count: number }): string
    {
        if (range.start < 0 || range.start >= this.length)
        {
            throw new Exception_ArgumentInvalid('range.start', range.start, 'index out of range');
        }
        if (Object.hasOwn(range, 'end'))
        {
            const end = (range as { end: number }).end;
            if (end < -1 || end >= this.length || end < range.start)
            {
                throw new Exception_ArgumentInvalid('range.end', range.start, 'index out of range');
            }

            return this.substring(range.start, end + 1);
        }
        else if (Object.hasOwn(range, 'count'))
        {
            const count = (range as { count: number }).count;
            if (count < 0 || range.start + count >= this.length)
            {
                throw new Exception_ArgumentInvalid('range.end', range.start, 'index out of range');
            }

            return this.substring(range.start, range.start + count);
        }
        else
        {
            return this.substring(range.start);
        }
    }

    xReplaceRange(range: { start: number, end: number } | { start: number, count: number }, replacement: string): string 
    {
        if (range.start < 0 || range.start >= this.length)
        {
            throw new Exception_ArgumentInvalid('range.start', range.start, 'index out of range');
        }
        if (Object.hasOwn(range, 'end'))
        {
            const end = (range as { end: number }).end;
            if (end < -1 || end >= this.length || end < range.start)
            {
                throw new Exception_ArgumentInvalid('range.end', range.start, 'index out of range');
            }

            const left = this.substring(0, range.start);
            const right = this.substring(end + 1);

            return `${left}${replacement}${right}`;
        }
        else if (Object.hasOwn(range, 'count'))
        {
            const count = (range as { count: number }).count;
            if (count < 0 || range.start + count >= this.length)
            {
                throw new Exception_ArgumentInvalid('range.end', range.start, 'index out of range');
            }

            const left = this.substring(0, range.start);
            const right = this.substring(range.start + count);

            return `${left}${replacement}${right}`;
        }
        else
        {
            throw new Exception_UnintendedExecutionPath(``);
        }
    }

    xEncodeToBase64(): string
    {
        return btoa(this as unknown as string);
    }

    xDecodeBase64(): string
    {
        return atob(this as unknown as string);
    }
}

// Assign the description of the added properties to the intrinsic type
const srcProto = StringX.prototype;
const dstProto = String.prototype;
const props = Object.getOwnPropertyNames(srcProto);
for (const prop of props)
{
    if (prop === 'constructor') continue;

    const addedProp = Object.getOwnPropertyDescriptor(srcProto, prop);
    Object.defineProperty(dstProto, prop, addedProp!);
}



// const props = Object.getOwnPropertyNames(StringX.prototype);
// for (const prop of props)
// {
//     if (prop === 'constructor') continue;

//     const proto = String.prototype as any;
//     const xProto = StringX.prototype as any;
//     proto[prop] = xProto[prop];
// }



// Object.defineProperty(String.prototype, 'x',
//     {
//         get: function ()
//         {
//             return new xString(this);
//         }
//     });


