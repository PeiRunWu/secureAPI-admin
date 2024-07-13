import Dropdown from "antd/es/dropdown";
import React, {FC, useCallback} from "react";
import {LogoutOutlined} from "@ant-design/icons";
import {history, useModel} from '@umijs/max';
import {removeWithExpiry} from "@/utils/localStorage";
import {outLogin} from "@/services/login/loginService";
import {flushSync} from "react-dom";
import {stringify} from 'querystring';
import {message} from "antd";
import type {MenuInfo} from 'rc-menu/lib/interface';

export type GlobalHeaderRightProps = {
    children?: React.ReactNode;
};


const menuItems = [
    {
        key: 'logout',
        icon: <LogoutOutlined/>,
        label: '退出登录',
    },
];


const AvatarDropdown: FC<GlobalHeaderRightProps> = ({children}) => {

    /**
     * 退出登录，并且将当前的 url 保存
     */
    const {setInitialState} = useModel('@@initialState');

    const loginOut = async () => {
        await outLogin();
        removeWithExpiry('secure-admin');
        flushSync(() => {
            setInitialState((s) => ({
                ...s,
                currentUser: undefined,
            }));
        });
        const {search, pathname} = window.location;
        const urlParams = new URL(window.location.href).searchParams;
        /** 此方法会跳转到 redirect 参数所在的位置 */
        const redirect = urlParams.get('redirect');
        // Note: There may be security issues, please note
        if (window.location.pathname !== '/login' && !redirect) {
            history.replace({
                pathname: '/login',
                search: stringify({
                    redirect: pathname + search,
                }),
            });
        }
    };

    const onMenuClick = useCallback(
        (event: MenuInfo) => {
            const {key} = event;
            if (key === 'logout') {
                loginOut().then(() => message.success("退出成功"));
                return;
            }
        },
        [setInitialState],
    );
    return (
        <Dropdown
            menu={{
                selectedKeys: [],
                onClick: onMenuClick,
                items: menuItems,
            }}
            placement="top"
        >
            {children}
        </Dropdown>
    )
}

export default AvatarDropdown;