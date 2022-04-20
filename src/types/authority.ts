import type { ElTree } from 'element-plus'
import { ref } from "vue"
export interface QueryInt {
    id: number,
    authorityIds: string
}
interface ListInt {
    name: string,
    roleId: number,
    viewRole: string,
    roleList: ListInt[]
}
export class InitData {
    id: number
    authorityIds: number[]
    list: ListInt[] = []
    treeRef = ref<InstanceType<typeof ElTree>>()
    
    constructor(id:number,authorityIds:string) {
        this.id = id
        this.authorityIds = authorityIds.split(',').map(v=>+v)
    }
}