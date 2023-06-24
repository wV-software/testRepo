
import { xArray } from "./ExtendingNativeTypes/Array/xArray.ts";
import './ExtendingNativeTypes/Array/xArray.d.ts';

import './ExtendingNativeTypes/String/xString.d.ts';

interface Array<T>
{
    get x(): xArray<T>;
}


export function test()
{
    const arr = [1,2,3];

    console.log('8888 Modified from Gotcha and pushed');
}
