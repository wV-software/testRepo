import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import '../ExtendingNativeTypes/String/xString.ts';


Deno.test({ name: "sub" },
    () =>
    {
        const output = 'George'.xRange({ start: 2, count: 2 });
        assertEquals(output, `or`);

        let output2 = 'George'.xRange({ start: 2, end: 2 });
        assertEquals(output2, `o`);

        let output3 = 'George'.xRange({ start: 2, end: 4 });
        assertEquals(output3, `org`);
    });

Deno.test({ name: "replaceRange" },
    () =>
    {
        const output = 'George'.xReplaceRange({ start: 0, count: 1 }, '||||||');
        console.log(output);
        // assertEquals(output, `or`);

    });

Deno.test({ name: "encodeToBase64" },
    () =>
    {
        const output = 'George'.xEncodeToBase64();
        console.log(output);
        // assertEquals(output, `or`);
        console.log(output.xDecodeBase64());

    });