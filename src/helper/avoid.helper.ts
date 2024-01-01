
export class Avoid<T>{

    nullOrUndefined(value: any, replace: any) {
        if (value == undefined || null){
            if(replace == undefined || null)
                throw new Error(`Was not implemented an value to replace ${value}`)
            return replace
        }
        return value
    }

    exceptionOnUndefined(value: any): T {
        if (value == undefined) throw new Error(`Value ${value} is undefined`)
        else return value
    }

    validArray(args: any[], messages: string[]) {
        if (!(args.length == messages.length))
            throw new Error("Values size not the same as message")

        for (let i = 0; i < args.length; i++) {
            if (args[i] == undefined || null) {
                throw new Error(messages[i])
            }
        }
    }

}