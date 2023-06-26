import { assertEquals, assertThrows } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import '../ExtendingNativeTypes/Array/xArray.ts';

Deno.test({ name: "test Array.insertMany" },
    () =>
    {
        const arr = [1, 2, 3];
        arr.xInsert(3, ...[4, 5]);
        console.log(arr);
        assertEquals(arr.length, 5);
    });

Deno.test({ name: "test Array.insertMany throws on index out of range" },
    () =>
    {
        const arr = [1, 2, 3];
        assertThrows(() =>
        {
            arr.xInsert(4, ...[4, 5]);
        });

        assertThrows(() =>
        {
            arr.xInsert(-1, ...[4, 5]);
        });

    });

Deno.test({ name: "intersect" },
    () =>
    {
        const output = [1,2,3,4,5,5,5,6].xIntersect([5,6,7,8,9]);
        assertEquals(output.length, 4)
    });

Deno.test({ name: "intersects" },
    () =>
    {
        const output = [1,2,3,4].xIntersects([5,6,7,8,9]);
        assertEquals(output, false);

        const output2 = [1,2,3,4,5].xIntersects([5,6,7,8,9]);
        assertEquals(output2, true);
    });