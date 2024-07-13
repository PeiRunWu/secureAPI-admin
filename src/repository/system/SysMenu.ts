import {DataNode} from "antd/lib/tree";


export interface SysMenuEntity {
    id: string,
    parentId: string,
    menuName: string,
    menuType: string,
    icon: string,
    orderNum: string,
    perms: string,
    component: string,
    status: number,
    createTime: string,
    hasChildren: boolean
}

export interface SysMenuVO {
    id?: string,
    parentId: string,
    menuName: string,
    menuType: string,
    icon: string,
    orderNum: string,
    perms: string,
    component: string,
    status: number,
    createTime: string,
}

export interface MenuTree {
    parentId?: string,
    value?: string,
    title?: string,
    children: MenuTree[]
}


export interface MenuDataNode {
    menuIds: string[];
    treeList: DataNode[];
}

export interface SysMenuQuery {
    menuName: string,
    status: number,
    parentId: string,
}