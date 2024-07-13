import {PageQuery, SysUserEntity, SysUserVO,} from '@/repository/system/SysUser';
import {request} from '@umijs/max';

/**
 * 分页查询用户信息
 * @param params
 */
export async function getUserInfoByPage(params: PageQuery) {
    return request<BaseResponse<PageInfo<SysUserEntity>>>(
        '/api/secure-system/sysUser/getUserInfoByPage',
        {
            method: 'GET',
            params,
        },
    );
}

/**
 * 创建用户
 * @param params
 */
export async function createUserInfo(params: SysUserVO) {
    return request<BaseResponse<string>>(
        '/api/secure-system/sysUser/createUserInfo',
        {
            method: 'POST',
            data: params,
        },
    );
}

/**
 * 编辑用户
 * @param params
 */
export async function updateUserInfo(params: SysUserVO) {
    return request<BaseResponse<string>>(
        '/api/secure-system/sysUser/updateUserInfo',
        {
            method: 'PUT',
            data: params,
        },
    );
}

/**
 * 删除用户信息
 * @param id
 */
export async function deleteUserInfo(id: string) {
    return request<BaseResponse<string>>(
        `/api/secure-system/sysUser/deleteUserInfo/${id}`,
        {
            method: 'DELETE',
        },
    );
}
