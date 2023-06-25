
import { Exception_ArgumentNull } from "../Exceptions/Exception_ArgumentNull.ts";
import { Exception_InvalidProgramState } from "../Exceptions/Exception_InvalidProgramState.ts";
import { Constructor } from "./Constructor.ts";


export function t(typeOrObject: Function|TypeInfo|Object): TypeInfo
{
    if(!typeOrObject) throw new Exception_ArgumentNull(`typeOrObject`);
    if(typeOrObject.constructor === TypeInfo) return typeOrObject;
    if(typeof typeOrObject === 'function') return TypeInfo.of(typeOrObject as Constructor);
    else return TypeInfo.of(typeOrObject.constructor);
}

export class TypeInfo
{ 
    private constructor(public readonly type: Function) {}

    public static of(type: Function|TypeInfo): TypeInfo
    {
        return (type.constructor === TypeInfo)? type as TypeInfo : new TypeInfo(type as Function);
    }

    public isSubOf(type: Function|TypeInfo)
    {
        if(type == null)
        {
            throw new Error();
        }

        let checkType = t(type).type;
        let stepType = this.type;
        do
        {
            stepType = Object.getPrototypeOf(stepType);
            if(!stepType) return false;
            if(stepType === checkType) return true;
        }   
        while(true);

        return false;
    }

    public isSameOrSubOf(type: Function|TypeInfo)
    {
        let bareType = t(type).type;

        if(bareType === this.type) return true;
        else return this.isSubOf(bareType);
    }

    public isAssignableFrom(type: Function|TypeInfo)
    {
        if(!type) { throw new Exception_ArgumentNull('type'); }

        let stepConstructor:Function;
        if(type.constructor === TypeInfo)
        {
            stepConstructor = (type as TypeInfo).type;
        }
        else
        {
            stepConstructor = type as Function;
        }
        
        if(!type) throw new Exception_InvalidProgramState('typeConstructor', 'typeConstructor should not be null here!');

        do
        {
            if(this.type === stepConstructor)
            {  
                return true;
            }

            stepConstructor = Object.getPrototypeOf(stepConstructor);
        }
        while(stepConstructor);

        return false;
    }

    public static GetDecoratedConstructor(constructor: Constructor): Constructor
    {
        while(!!constructor && !constructor.name)
        {
            constructor = Object.getPrototypeOf(constructor);
        }

        return constructor;
    }

    public static ofObject(obj: any): TypeInfo
    {
        if(!obj) throw new Exception_ArgumentNull('obj');

        let type = obj.constructor;
        while(!!type && !type.name)
        {
            type = Object.getPrototypeOf(type);
        }

        return new TypeInfo(type);
    }

    public get typeName(): string
    {
        return this.type.name;
    }
}