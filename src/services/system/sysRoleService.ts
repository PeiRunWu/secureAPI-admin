import {request} from '@umijs/max';
import {PageQuery, SysRoleEntity, SysRoleVO} from "@/repository/system/SysRole";

/**
 * 分页查询用户信息
 * @param params
 */
export async function getRoleInfoByPage(params: PageQuery) {
    return request<BaseResponse<PageInfo<SysRoleEntity>>>(
        '/api/secure-system/sysRole/getRoleInfoByPage',
        {
            method: 'GET',
            params,
        },
    );
}


/**
 * 创建角色
 * @param params
 */
export async function createRoleInfo(params: SysRoleVO) {
    return request<BaseResponse<string>>(
        '/api/secure-system/sysRole/createRoleInfo',
        {
            method: 'POST',
            data: params,
        },
    );
}


/**
 * 编辑角色
 * @param params
 */
export async function updateRoleInfo(params: SysRoleVO) {
    return request<BaseResponse<string>>(
        '/api/secure-system/sysRole/updateRoleInfo',
        {
            method: 'PUT',
            data: params,
        },
    );
}


/**
 * 删除角色信息
 * @param roleId
 */
export async function deleteRoleInfo(roleId: string | undefined) {
    return request<BaseResponse<string>>(
        `/api/secure-system/sysRole/deleteRoleInfo/${roleId}`,
        {
            method: 'DELETE',
        },
    );
}


/**
 * 获取角色信息排除隐藏角色
 */
export async function getRoleInfoExcludeHidden() {
    return request<BaseResponse<SysRoleVO[]>>(
        '/api/secure-system/sysRole/getRoleInfoExcludeHidden',
        {
            method: 'GET',
        },
    );
}
