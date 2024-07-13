// 运行时配置
import {SettingDrawer, Settings as LayoutSettings} from '@ant-design/pro-components';
import {history, RunTimeLayoutConfig} from '@umijs/max';
import {requestConfig} from './requestConfig';
import defaultSettings from "../config/defaultSettings";
import {CurrentUser} from "@/repository/system/SysUser";
import {getCurrentUserMenus, queryCurrentUser} from "@/services/login/loginService";
import {getWithExpiry} from "@/utils/localStorage";
import AvatarDropdown from './components/Avatar/AvatarDropdown';
import React from "react";
import {MenuItem} from "@/repository/login/Login";
import Icon from './components/Icon';
import * as AllIcons from '@ant-design/icons';

const loginPath = '/login';

const loopMenuItem = (menus: any[]): MenuItem[] =>
    menus.map(({icon, routes, ...item}) => ({
        ...item,
        icon: icon && <Icon name={icon as keyof typeof AllIcons}/>,
        children: routes && loopMenuItem(routes),
    }));

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
    currentUser?: CurrentUser;
    fetchUserInfo?: () => Promise<CurrentUser | undefined>;
    settings?: Partial<LayoutSettings>;
}> {
    const fetchUserInfo = async () => {
        try {
            const response = await queryCurrentUser();
            return response.data;
        } catch (error) {
            history.push(loginPath);
        }
        return undefined;
    };
    let token = getWithExpiry('secure-admin');
    const {location} = history;
    if (location.pathname !== loginPath && token) {
        const currentUser = await fetchUserInfo()
        if (currentUser) {
            return {
                fetchUserInfo,
                currentUser,
                settings: defaultSettings as Partial<LayoutSettings>,
            };
        }
    }
    return {
        fetchUserInfo,
        settings: defaultSettings as Partial<LayoutSettings>,
    };
}

export const layout: RunTimeLayoutConfig = ({
                                                initialState,
                                                setInitialState,
                                            }) => {
    return {
        menu: {
            locale: false,
            request: async () => {
                let token = getWithExpiry('secure-admin');
                if (token) {
                    const menuData = await getCurrentUserMenus();
                    return loopMenuItem(menuData.data || []);
                } else {
                    return []
                }
            },
        },
        avatarProps: {
            src: initialState?.currentUser?.avatar,
            title: initialState?.currentUser?.username,
            render: (props, dom) => {
                return <AvatarDropdown>{dom}</AvatarDropdown>;
            },
        },
        onPageChange: () => {
            const {location} = history;
            if (!initialState?.currentUser && location.pathname !== loginPath) {
                history.push(loginPath);
            }
        },
        childrenRender: (children) => {
            return (
                <>
                    {children}
                    <SettingDrawer
                        disableUrlParams
                        enableDarkTheme
                        settings={initialState?.settings}
                        onSettingChange={(settings: Partial<LayoutSettings>) => {
                            setInitialState((preInitialState) => ({
                                ...preInitialState,
                                settings,
                            }));
                        }}
                    />
                </>
            );
        },
        ...initialState?.settings,
    };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
    ...requestConfig,
};
