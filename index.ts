
const arrProto = Array.prototype;
arrProto.count = function()
{
    return this.length;
}

export function test()
{
    console.log('8888 Modified from Gotcha and pushed');
}
