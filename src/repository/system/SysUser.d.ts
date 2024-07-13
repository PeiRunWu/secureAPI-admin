export interface SysUserEntity {
    id: string;
    username: string;
    nickname: string;
    password: string;
    email: string;
    phone: string;
    avatar: string;
    status: number;
    roleList: Role[],
    createTime: string;
    updateTime: string;
}

export interface Role {
    roleId: string,
    roleName: string
}

export interface PageQuery {
    username: string;
    status: number;
    startTime: string;
    endTime: string;
}

export interface CurrentUser {
    id: string;
    username: string;
    avatar: string;
}


export interface SysUserVO {
    id: string;
    username: string;
    nickname: string;
    password: string;
    email: string;
    phone: string;
    avatar: string;
    status: number;
    roleList: Role[],
    file?: any;
}

export interface DeleteSysUserVO {
    id: string
}
