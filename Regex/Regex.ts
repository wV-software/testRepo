export class RegexGroup
{
    constructor(public readonly groupName: string,
        public readonly value: string,
        public readonly indexInMatch: number,
        public readonly indexInInput: number,
        public readonly parentMatch: RegexMatch) { }

    get length(): number
    {
        return this.value.length;
    }

    get lastIndexInMatch(): number
    {
        return this.indexInMatch + this.length - 1;
    }

    get lastIndexInInput(): number
    {
        return this.indexInInput + this.length - 1;
    }
}

export class RegexMatch
{
    constructor(public readonly value: string,
        public readonly index: number,
        public readonly length: number,
        public readonly groups: Map<string, RegexGroup>) { }

    get lastIndex(): number
    {
        return this.index + this.length - 1;
    }

    group(name: string): RegexGroup|undefined
    {
        return this.groups.get(name);
    }

}

export class Regex
{
    private constructor(){}

    private _regExp!: RegExp;

    static of(jsNativeRegExp: RegExp): Regex
    {
        const output = new Regex();
        output._regExp = jsNativeRegExp;
        return output;
    }
    
    static parse(pattern: string, options?:
        {
            i?: boolean,
            m?: boolean,
            s?: boolean,
        }
    ): Regex 
    {
        options = options ?? {};
        
        const output = new Regex();
        output._regExp = new RegExp(pattern, `g${options.i ? 'i' : ''}${options.m ? 'm' : ''}${options.s ? 's' : ''}`);
        return output;
    }

    hasMatches(input: string, startingFromIndex = 0): boolean
    {
        this._regExp.lastIndex = startingFromIndex;
        const nativeMatch = this._regExp.exec(input);
        this._regExp.lastIndex = 0;
        return !!nativeMatch;
    }

    getFirstMatch(input: string, startingFromIndex: number = 0): RegexMatch|undefined
    {
        this._regExp.lastIndex = startingFromIndex;

        let nativeMatch = this._regExp.exec(input);
        if(!nativeMatch) return undefined;

        const outputGroups = new Map<string, RegexGroup>();
            const matchValue = nativeMatch[0];
            const match = new RegexMatch(matchValue,
                nativeMatch.index,
                matchValue.length,
                outputGroups
            );

        const nativeGroups: any = (nativeMatch as any).groups;
        if (!nativeGroups) return match;

        const groupNames = Object.getOwnPropertyNames(nativeGroups);
        for (let groupName of groupNames)
        {
            const groupValue = nativeGroups[groupName];
            if (!groupValue || groupValue.length === 0) continue;

            const indexInMatch = matchValue.indexOf(groupValue);
            const indexInInput = match.index + indexInMatch;
            const group = new RegexGroup(groupName, groupValue, indexInMatch, indexInInput, match);
            console.log(group);
            outputGroups.x.add(groupName, group);
        }

        return match;
    }

    getLastMatch(input: string, startingFromIndex = 0): RegexMatch|undefined
    {
        this._regExp.lastIndex = startingFromIndex;

        const match = this.getMatches(input)?.x.last();
        this._regExp.lastIndex = 0;
        return match;
    }

    getMatches(input: string, startingFromIndex = 0, 
               upToIndex:number|undefined = undefined): RegexMatch[]
    {
        this._regExp.lastIndex = startingFromIndex;
        const output: RegexMatch[] = [];

        let nativeMatch: RegExpExecArray | null;
        while (nativeMatch = this._regExp.exec(input)) 
        {
            const lastIndexOfMatch = nativeMatch.index + nativeMatch[0].length - 1;
            if(upToIndex != null && lastIndexOfMatch > upToIndex)
            {
                break;
            }

            const outputGroups = new Map<string, RegexGroup>();
            const matchValue = nativeMatch[0];

            const match = new RegexMatch(matchValue,
                nativeMatch.index,
                matchValue.length,
                outputGroups
            );
            output.x.add(match);



            const nativeGroups: any = (nativeMatch as any).groups;
            if (!nativeGroups) continue;

            const groupNames = Object.getOwnPropertyNames(nativeGroups);
            for (let groupName of groupNames)
            {
                const groupValue = nativeGroups[groupName];
                if (!groupValue || groupValue.length === 0) continue;

                const indexInMatch = matchValue.indexOf(groupValue);
                const indexInInput = match.index + indexInMatch;
                const group = new RegexGroup(groupName, groupValue, indexInMatch, indexInInput, match);
                console.log(group);
                outputGroups.x.add(groupName, group);
            }
        }

        this._regExp.lastIndex = 0;
        return output;
    }

    replaceMatches(input: string,
        replacementDeducer: (match: RegexMatch) => string, startingFromIndex = 0): { newString: string, realReplacementCount: number }
    {

        this._regExp.lastIndex = startingFromIndex;
        const matches = this.getMatches(input);
        if (matches.length === 0)
        {
            return { newString: input, realReplacementCount: 0 };
        }

        let cursor = 0;
        const outputParts: string[] = [];
        let realReplacementCount = 0;

        for (const match of matches)
        {
            if (match.index > cursor)
            {
                outputParts.x.add(input.x.range({start: cursor, count: match.index - cursor}));
            }
            const replacementValue = replacementDeducer(match);
            if (replacementValue !== match.value)
            {
                realReplacementCount++;
            }
            outputParts.x.add(replacementValue);

            cursor = match.lastIndex + 1;
        }

        if (cursor < input.length - 1)
        {
            outputParts.x.add(input.x.range({start: cursor, end: input.length - 1}));
        }

        this._regExp.lastIndex = 0;
        return { newString: outputParts.join(''), realReplacementCount: realReplacementCount };
    }

    replaceGroups(input: string, groupNames: string[],
        replacementDeducer: (group: RegexGroup) => string,
        startingFromIndex = 0): { newString: string, realReplacementCount: number }
    {
        this._regExp.lastIndex = startingFromIndex;
        const groups = this.getMatches(input).x.selectMany(m => m.groups.x.values).x.where(group => groupNames.x.contains(group.groupName));
        if (groups.length === 0)
        {
            return { newString: input, realReplacementCount: 0 };
        }

        let cursor = 0;
        const outputParts: string[] = [];
        let realReplacementCount = 0;

        for (const group of groups)
        {
            if (group.indexInInput > cursor)
            {
                outputParts.x.add(input.x.range({start: cursor, count: group.indexInInput - cursor}));
            }
            const replacementValue = replacementDeducer(group);
            if (replacementValue !== group.value)
            {
                realReplacementCount++;
            }
            outputParts.x.add(replacementValue);

            cursor = group.lastIndexInInput + 1;
        }

        if (cursor < input.length - 1)
        {
            outputParts.x.add(input.x.range({start: cursor, count: input.length - cursor}));
        }
        this._regExp.lastIndex = 0;
        return { newString: outputParts.join(''), realReplacementCount: realReplacementCount };
    }

    splitByMatches(input: string, condition: (match: RegexMatch) => boolean = m => true): {value: string, index: number, lastIndex: number}[]
    {
        // this._regExp.lastIndex = startingFromIndex;
        const matches = this.getMatches(input);
        if (matches.length === 0) return [{value: input, index: 0, lastIndex: input.length - 1}];

        let cursor = 0;
        const output: {value: string, index: number, lastIndex: number}[] = [];

        for (const match of matches)
        {
            if(condition(match), match.index > cursor)
            {
                const value = input.x.range({start: cursor, count: match.index - cursor});
                const lastIndex = match.index - 1;
                output.push({value, index: cursor, lastIndex});
            }
            cursor = match.lastIndex + 1;
        }

        if (cursor < input.length - 1)
        {
            const value = input.x.range({start: cursor, count:input.length - 1}); 
            output.push({value, index: cursor, lastIndex: input.length - 1});
        }
        this._regExp.lastIndex = 0;
        return output;
    }

    splitByGroups(input: string, groupNames: string[], condition: (group: RegexGroup) => boolean, startingFromIndex = 0): string[]
    {
        this._regExp.lastIndex = startingFromIndex;
        const groups = this.getMatches(input).x.selectMany(m => m.groups.x.values).x.where(group => groupNames.x.contains(group.groupName));
        if (groups.length === 0) return [input];

        let cursor = 0;
        const outputParts: string[] = [];

        for (const group of groups)
        {
            if (group.indexInInput > cursor)
            {
                outputParts.x.add(input.x.range( {start: cursor, count: group.indexInInput - cursor}));
            }
            cursor = group.lastIndexInInput + 1;
        }

        if (cursor < input.length - 1)
        {
            outputParts.x.add(input.x.range({start: cursor, count: input.length - 1}));
        }
        this._regExp.lastIndex = 0;
        return outputParts;
    }
}