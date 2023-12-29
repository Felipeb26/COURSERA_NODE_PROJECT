export class Avoid<T>{

    avoidUndefined(value: any, asycn:boolean): T {
        if (value == undefined) throw new Error(`Value ${value} is undefined`)
        else return value
    }
}