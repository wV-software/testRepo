import { xArrayImpl } from "./ExtendingNativeTypes/xArrayImpl.ts";

declare interface Array<T>
{
    get x(): xArrayImpl<T>;
}