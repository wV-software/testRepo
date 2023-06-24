
import { xArray } from "./ExtendingNativeTypes/xArray.ts";
import './ExtendingNativeTypes/xArray.d.ts';

interface Array<T>
{
    get x(): xArray<T>;
}


export function test()
{
    const arr = [1,2,3];

    console.log('8888 Modified from Gotcha and pushed');
}
