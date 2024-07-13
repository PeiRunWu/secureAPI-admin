import {request} from '@umijs/max';
import {LoginEntity, MenuItem} from "@/repository/login/Login";
import {CurrentUser} from "@/repository/system/SysUser";
import {UserOnlineEntity} from "@/repository/system/UserOnline";

/**
 * 登入
 * @param params
 */
export async function login(params: LoginEntity) {
    return request<BaseResponse<string>>(
        '/api/secure-auth/user/login',
        {
            method: 'POST',
            data: params
        },
    );
}


/**
 * 获取当前登入用户信息
 */
export async function queryCurrentUser() {
    return request<BaseResponse<CurrentUser>>(
        '/api/secure-auth/user/queryCurrentUser',
        {
            method: 'GET',
        },
    );
}

/**
 * 退出
 */
export async function outLogin() {
    return request<BaseResponse<string>>(
        '/api/secure-auth/user/logout',
        {
            method: 'GET',
        },
    );
}

/**
 * 获取当前用户下所属的菜单列表
 */
export async function getCurrentUserMenus() {
    return request<BaseResponse<MenuItem[]>>(
        '/api/secure-auth/user/getCurrentUserMenus',
        {
            method: 'GET',
        },
    );
}

/**
 * 获取当前用户下所属的菜单列表
 */
export async function getUserOnlineInfo() {
    return request<BaseResponse<UserOnlineEntity[]>>(
        '/api/secure-auth/user/getUserOnlineInfo',
        {
            method: 'GET',
        },
    );
}

/**
 * 获取当前用户下所属的菜单列表
 */
export async function offlineUser(params: { id: string }) {
    return request<BaseResponse<void>>(
        '/api/secure-auth/user/offlineUser',
        {
            method: 'GET',
            params
        },
    );
}
