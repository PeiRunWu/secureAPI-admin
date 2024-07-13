import {MenuDataNode, MenuTree, SysMenuEntity, SysMenuQuery, SysMenuVO} from "@/repository/system/SysMenu";
import {request} from "@umijs/max";

/**
 * 分页查询菜单列表信息
 * @param params
 */
export async function getMenuInfoByPage(params: SysMenuQuery) {
    return request<BaseResponse<PageInfo<SysMenuEntity>>>(
        '/api/secure-system/sysMenu/getMenuInfoByPage',
        {
            method: 'GET',
            params,
        },
    );
}

/**
 * 查询菜单目录信息
 *
 */
export async function getMenuTableInfo() {
    return request<BaseResponse<MenuTree[]>>(
        '/api/secure-system/sysMenu/getMenuTableInfo',
        {
            method: 'GET',
        },
    );
}


/**
 * 创建菜单列表
 * @param params
 */
export async function createMenuInfo(params: SysMenuVO) {
    return request<BaseResponse<string>>(
        '/api/secure-system/sysMenu/createMenuInfo',
        {
            method: 'POST',
            data: params,
        },
    );
}

/**
 * 更新菜单列表
 * @param params
 */
export async function updateMenuInfo(params: SysMenuVO) {
    return request<BaseResponse<string>>(
        '/api/secure-system/sysMenu/updateMenuInfo',
        {
            method: 'PUT',
            data: params,
        },
    );
}

/**
 * 更新菜单列表
 * @param id
 */
export async function deleteMenuInfo(id: string) {
    return request<BaseResponse<string>>(
        `/api/secure-system/sysMenu/deleteMenuInfo/${id}`,
        {
            method: 'DELETE',
        },
    );
}


/**
 * 查找当前角色下的菜单列表
 *
 */
export async function findSysMenuByRoleId(params: { roleId: string | undefined }) {
    return request<BaseResponse<MenuDataNode>>(
        '/api/secure-system/sysMenu/findSysMenuByRoleId',
        {
            method: 'GET',
            params
        },
    );
}
