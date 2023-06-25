import { assertEquals, assertThrows } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import '../ExtendingNativeTypes/Array/xArray.ts';

Deno.test({ name: "test Array.insertMany" },
    () =>
    {
        const arr = [1, 2, 3];
        arr.x.insert(3, ...[4, 5]);
        console.log(arr);
        assertEquals(arr.length, 5);
    });

Deno.test({ name: "test Array.insertMany throws on index out of range" },
    () =>
    {
        const arr = [1, 2, 3];
        assertThrows(() =>
        {
            arr.x.insert(4, ...[4, 5]);
        });

        assertThrows(() =>
        {
            arr.x.insert(-1, ...[4, 5]);
        });

    });

Deno.test({ name: "intersect" },
    () =>
    {
        const output = [1,2,3,4,5,5,5,6].x.intersect([5,6,7,8,9]);
        assertEquals(output.length, 4)
    });

Deno.test({ name: "intersects" },
    () =>
    {
        const output = [1,2,3,4].x.intersects([5,6,7,8,9]);
        assertEquals(output, false);

        const output2 = [1,2,3,4,5].x.intersects([5,6,7,8,9]);
        assertEquals(output2, true);
    });