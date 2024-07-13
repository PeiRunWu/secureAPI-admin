import React from "react";

export interface SysRoleEntity {
    id: string;
    roleName: string;
    status: number;
    createTime: string;
    updateTime: string;
}

export interface SysRoleVO {
    id?: string;
    roleName: string;
    status: number;
    menuIds?: React.Key[]
}

export interface PageQuery {
    roleName: string;
    startTime: string;
    endTime: string;
}