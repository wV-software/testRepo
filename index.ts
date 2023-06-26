
import "./ExtendingNativeTypes/Array/xArray.ts";
import './ExtendingNativeTypes/Array/xArray.d.ts';
import './ExtendingNativeTypes/String/xString.ts';
import './ExtendingNativeTypes/String/xString.d.ts';
import './ExtendingNativeTypes/Map/xMap.ts';
import './ExtendingNativeTypes/Map/xMap.d.ts';
import './ExtendingNativeTypes/Object/xObject.d.ts'
import './ExtendingNativeTypes/Object/xObject.ts'

export { Guid } from './Guid/Guid.ts';
export {Exception} from './Exceptions/Exception.ts'
export {Exception_ArgumentInvalid} from './Exceptions/Exception_ArgumentInvalid.ts'
export {Exception_ArgumentNull} from './Exceptions/Exception_ArgumentNull.ts'
export {Exception_InvalidOperation} from './Exceptions/Exception_InvalidOperation.ts'
export {Exception_UnintendedExecutionPath} from './Exceptions/Exception_UnintendedExecutionPath.ts'
export {Exception_InvalidProgramState} from './Exceptions/Exception_InvalidProgramState.ts'
export {DateTime} from './DateTime/DateTime.ts';
export {TimeSpan} from './DateTime/TimeSpan.ts';
export {DateFormat} from './DateTime/DateFormat.ts';
export {WeekDay} from './DateTime/WeekDay.ts';
export {Regex} from './Regex/Regex.ts';
export type {Constructor} from './TypeInfo/Constructor.ts';
export {TypeInfo} from './TypeInfo/TypeInfo.ts';
export {isPrimitive} from './globalFunctions/isPrimitive.ts';
export {waitAsync, CancellationToken} from './globalFunctions/waitAsync.ts'

class Something extends Object
{
    name!: string;
    age!: number;
}

const b = new Something()
b.name = 'george';
b.age = 15;
const map = b.toMap();
console.log(map);


let a = new Map<string, string>();
a.xAdd("", "");

let x = {test: ""}

let y = "George".xReplaceRange({start: 1, end: 3}, "|||");
console.log(y);


function test()
{
    const arr = [1,2,3];

    console.log('8888 Modified from Gotcha and pushed');
}
