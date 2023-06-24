
const arrProto = Array.prototype;
arrProto.count = function()
{
    return this.length;
}

export function test()
{
    const arr = [1,2,3];

    console.log('8888 Modified from Gotcha and pushed');
}
