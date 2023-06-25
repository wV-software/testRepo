import { Exception_ArgumentNull } from "../../Exceptions/Exception_ArgumentNull.ts";
import { DateFormat } from "./DateFormat.ts";
import { TimeSpan } from "./TimeSpan.ts";
import { WeekDay } from "./WeekDay.ts";

export class DateTime 
{
    get Ticks(): number
    {
        return this._ticks;
    }

    constructor(private _ticks: number = 0)
    {
        if(_ticks > 864000000000000)
            throw new Error('Value exceeds DateTime.Max.');
        if(_ticks < 0)
            throw new Error('Value is less than DateTime.Min');

        this.valueOf = () => this._ticks;
    }

    toString(): string
    {
        return `${this.year}-${this.month}-${this.dayOfMonth} ${this.hour}:${this.minute}:${this.second}.${this.milliSecond}`;
    }

    static get min(): DateTime
    {
        return new DateTime(0);
    }

    static get max()
    {
        return new DateTime(864000000000000);
    }

    static get now(): DateTime
    {
        return new DateTime(Date.now().valueOf()); 
    }

    asLocalToUtc(): DateTime
    {
        let utc:number = new Date(2020, 0, 1).valueOf();

        // this is funckinly meant to be the local time of the UTC 2020-01-01 by the fucken javascript
        let local:number = Date.UTC(2020, 0, 1).valueOf();

        return new DateTime(this._ticks - (local - utc));
    }

    asUtcToLocal(): DateTime
    {
        let utc = new Date(2020, 0, 1).valueOf();

        // this is funckinly meant to be the local time of the UTC 2020-01-01 by the fucken javascript
        let local = Date.UTC(2020, 0, 1).valueOf();

        return new DateTime(this._ticks - (utc - local));
    }

    private static _invalidFormatMessage = `Invalid DateTime format. Valid formats should satisfy the following two conditions: 
    (1) it should be composed of [3, 5, 6, or 7] parts. 3 parts for date only, 6 parts for date and time excluding millisec part, 
    and 7 prats for the whole date and time including the milliseconds part. 
    (2) Parts separators could be any single non-digit characters while extra spaces arround are not significant. 
    (It's not required to have a consistent use of the single separator)`; 

    static tryParse(text: string, 
                    refResult:{Result:DateTime, ErrorMessage:string},
                    format: DateFormat = DateFormat.yyyy_MM_dd): boolean
    {
        if(!refResult)
        {
            throw new Exception_ArgumentNull('refResult');
        }

        text = text.trim();
        let parts = text.split(/\s*\D\s*/); 
        if([3,6,7].x.contains(parts.length) === false || parts.x.isAny(p=>/\D/.test(p)))
        {
            refResult.ErrorMessage = this._invalidFormatMessage;
            return false;
        }
        else
        {
            let numParts!: number[];
            numParts = parts.x.remodel(sp=>parseInt(sp));

            if(numParts.x.isAny(n => isNaN(n)))
            {
                refResult.ErrorMessage = this._invalidFormatMessage;
                return false;
            }

            let year=0, month=0, day=0, hour=0, minute=0, sec=0, milliSec=0;
            switch(format)
            {
                case DateFormat.yyyy_MM_dd:
                    year = numParts[0];
                    month = numParts[1];
                    day = numParts[2];
                    break;
                case DateFormat.MM_dd_yyyy:
                    year = numParts[2];
                    month = numParts[0];
                    day = numParts[1];
                    break;
                case DateFormat.dd_MM_yyy:
                    year = numParts[2];
                    month = numParts[1];
                    day = numParts[0];
                    break;
            }
            hour        = (numParts.length > 3)? numParts[3] : 0; 
            minute      = (numParts.length > 4)? numParts[4] : 0; 
            sec         = (numParts.length > 5)? numParts[5] : 0; 
            milliSec    = (numParts.length > 6)? numParts[6] : 0; 
           
            try
            {
                let ticks = Date.parse(`${year}-${month}-${day} ${hour}:${minute}:${sec}.${milliSec}`);
                let fuckenJsDate = new DateTime(ticks);
                if(fuckenJsDate.milliSecond !== milliSec) // means it rolled over
                {
                    refResult.ErrorMessage = `Wrong millisecond part: ${milliSec}`;
                    return false;
                }
                if(fuckenJsDate.second !== sec) // means it rolled over
                {
                    refResult.ErrorMessage = `Wrong second part: ${sec}`;
                    return false;
                }
                else if(fuckenJsDate.minute !== minute) // means it rolled over
                {
                    refResult.ErrorMessage = `Wrong minute part: ${minute}`;
                    return false;
                }
                else if(fuckenJsDate.hour !== hour) // means it rolled over
                {
                    refResult.ErrorMessage = `Wrong hour part: ${hour}`;
                    return false;
                }
                else if(fuckenJsDate.dayOfMonth !== day) // means it rolled over
                {
                    refResult.ErrorMessage = `Wrong hour part: ${day}`;
                    return false;
                }
                else if(fuckenJsDate.month !== month) // means it rolled over
                {
                    refResult.ErrorMessage = `Wrong month part: ${month}`;
                    return false;
                }
                else if(fuckenJsDate.year !== year) // means it rolled over
                {
                    refResult.ErrorMessage = `Wrong year part: ${year}`;
                    return false;
                }
            }
            catch(er)
            {
                refResult.ErrorMessage = (er as object).toString(); 
                return false;
            }
            
            if(refResult != null)
            {
                refResult.ErrorMessage = "";
                refResult.Result = new DateTime(Date.parse(`${year}-${month}-${day} ${hour}:${minute}:${sec}.${milliSec}`));
            }

            return true;
        }
    }

    /**
     * Valid formats should satisfy the following two conditions: (1) it should be composed of [3, 5, 6, or 7] parts. 3 parts for date only, 6 parts for date and time excluding millisec part, and 7 prats for the whole date and time parts including the milliseconds part. (2) Parts separators could be either one or more spaces or any non-digit character preceded or succeeded by zero or more white spaces.
     * @param dateTimeInText A text representation of a DateTime
     * @param The date time format to parse against.
     */
    public static parse(dateTimeInText: string, format:DateFormat=DateFormat.yyyy_MM_dd): DateTime
    {
       let refResult={Result:DateTime.min, ErrorMessage:"null"};

       //let refResult = {Result:null, ErrorMessage:null};
       if(DateTime.tryParse(dateTimeInText, refResult, format))
       {
           return refResult.Result;
       }
       else
       {        
           throw new Error(refResult.ErrorMessage as string);
       }
    }

    
    get year(): number
    {
        return new Date(this.Ticks).getFullYear();
    }
    get month(): number
    {
        return new Date(this.Ticks).getMonth() + 1;
    }
    get dayOfMonth(): number
    {
        return new Date(this.Ticks).getDate();
    }
    get dayOfWeek(): WeekDay
    {
        let dayOfWeek = new Date(this.Ticks).getDay();
        return Object.getPrototypeOf(WeekDay)[dayOfWeek]; 
    }
    get hour(): number
    {
        return new Date(this.Ticks).getHours();
    }
    get minute(): number
    {
        return new Date(this.Ticks).getMinutes();
    }
    get second(): number
    {
        return new Date(this.Ticks).getSeconds();
    }
    get milliSecond(): number
    {
        return new Date(this.Ticks).getMilliseconds();
    }

    addDays(daysToAdd:number)
    {
        return new DateTime(this.Ticks + daysToAdd * 24 * 60 * 60 * 1000);
    }

    addHours(hoursToAdd: number)
    {
        return new DateTime(this.Ticks + hoursToAdd * 60 * 60 * 1000);
    }

    addMinutes(minutesToAdd: number)
    {
        return new DateTime(this.Ticks + minutesToAdd * 60 * 1000);
    }

    addSeconds(secondsToAdd: number)
    {
        return new DateTime(this.Ticks + secondsToAdd * 1000);
    }

    addMilliseconds(millisecondsToAdd: number)
    {
        return new DateTime(this.Ticks + millisecondsToAdd);
    }

    compare(otherDateTime: DateTime)
    {
        return this > otherDateTime ? 1 : (this < otherDateTime ? -1 : 0);
    }

    get date(): DateTime
    {
        return DateTime.parse(`${this.year}-${this.month}-${this.dayOfMonth}`);
    }

    subtractDate(another: DateTime): TimeSpan
    {
        return new TimeSpan(this.Ticks - another.Ticks);
    }
    subtractSpan(timeSpan: TimeSpan): DateTime
    {
        return new DateTime(this.Ticks - timeSpan.ticks);
    }

    equals(another:DateTime)
    {
        return this.Ticks === another.Ticks;
    }

    get timeOfDay(): TimeSpan
    {
        return new TimeSpan(this.Ticks - this.date.Ticks);
    }
}
