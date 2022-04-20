export interface ListInt {
    roleName: string,
    roleId: number,
    authority: number[]
}
interface AddDataInt{
    roleName:string
}

export class InitData {
    list: ListInt[] = []
    addData: AddDataInt = {
        roleName: ""
    }
    isAdd = false
}