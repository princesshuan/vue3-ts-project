export interface ListInt {
    id: number,
    nikeName: string,
    userName: string,
    role: RoleInt[]
}
export interface activeInt {
    id: number,
    nikeName: string,
    userName: string,
    role: number[]
}
interface RoleInt {
    role: number,
    roleName: string,
    
}
interface SelectDataInt {
    nikeName: string,
    roleId: number
}
interface RoleListInt {
    roleName: string,
    roleId: number,
    authory:number[]
}

export class InitData {
    selectData: SelectDataInt = {
        nikeName: '',
        roleId: 0
    }
    list: [ListInt][] = []
    listData: [ListInt][] = []
    rolelist: RoleListInt[] = []
    active: activeInt = {
        id: 0,
        nikeName: "",
        userName: "",
        role: []
    }
    isShow = false
}