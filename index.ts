
import { xArrayImpl } from "./ExtendingNativeTypes/xArrayImpl.ts";
import './global.d.ts';

interface Array<T>
{
    get x(): xArrayImpl<T>;
}


export function test()
{
    const arr = [1,2,3];

    console.log('8888 Modified from Gotcha and pushed');
}
