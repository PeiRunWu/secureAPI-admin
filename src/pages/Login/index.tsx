import {AlipayOutlined, LockOutlined, TaobaoOutlined, UserOutlined, WeiboOutlined,} from '@ant-design/icons';
import {LoginFormPage, ProConfigProvider, ProFormText,} from '@ant-design/pro-components';
import {Divider, message, Space, Tabs, theme} from 'antd';
import type {CSSProperties, FC} from 'react';
import {useState} from 'react';
import {login} from "@/services/login/loginService";
import {LoginEntity} from "@/repository/login/Login";
import {history, useModel} from "umi";
import {setWithExpiry} from "@/utils/localStorage";
import {flushSync} from "react-dom";

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const items = [
    {label: '账户密码登录', key: 'account',},
    {label: '手机号登录', key: 'mobile',},
];

const Login: FC = () => {
    const [loginType, setLoginType] = useState<LoginType>('account');
    const {token} = theme.useToken();

    const {initialState, setInitialState} = useModel('@@initialState');

    const fetchUserInfo = async () => {
        const userInfo = await initialState?.fetchUserInfo?.();
        if (userInfo) {
            flushSync(() => {
                setInitialState((initialState) => ({
                    ...initialState,
                    currentUser: userInfo,
                }));
            });
        }
    };

    const doUserLogin = async (values: LoginEntity) => {
        const hide = message.loading('登录中');
        try {
            const response = await login(values);
            if (response.code === 200) {
                message.success('登入成功');
                setWithExpiry(
                    'secure-admin',
                    response.data,
                    3600 * 24 * 1000,
                );
                await fetchUserInfo();
                const urlParams = new URL(window.location.href).searchParams;
                history.push(urlParams.get('redirect') || '/');
                return;
            }
        } catch (e: any) {
            message.error("登入失败");
        } finally {
            hide();
        }
    };


    return (
        <ProConfigProvider dark>
            <div
                style={{
                    backgroundColor: 'white',
                    height: '100vh',
                }}
            >
                <LoginFormPage
                    backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
                    logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                    backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                    title="secure-admin"
                    containerStyle={{
                        backgroundColor: 'rgba(0, 0, 0,0.65)',
                        backdropFilter: 'blur(4px)',
                    }}
                    subTitle="后台管理系统"
                    actions={
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <Divider plain>
              <span
                  style={{
                      color: token.colorTextPlaceholder,
                      fontWeight: 'normal',
                      fontSize: 14,
                  }}
              >
                其他登录方式
              </span>
                            </Divider>
                            <Space align="center" size={24}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        height: 40,
                                        width: 40,
                                        border: '1px solid ' + token.colorPrimaryBorder,
                                        borderRadius: '50%',
                                    }}
                                >
                                    <AlipayOutlined style={{...iconStyles, color: '#1677FF'}}/>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        height: 40,
                                        width: 40,
                                        border: '1px solid ' + token.colorPrimaryBorder,
                                        borderRadius: '50%',
                                    }}
                                >
                                    <TaobaoOutlined style={{...iconStyles, color: '#FF6A10'}}/>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        height: 40,
                                        width: 40,
                                        border: '1px solid ' + token.colorPrimaryBorder,
                                        borderRadius: '50%',
                                    }}
                                >
                                    <WeiboOutlined style={{...iconStyles, color: '#1890ff'}}/>
                                </div>
                            </Space>
                        </div>
                    }
                    onFinish={async (values) => {
                        await doUserLogin(values as LoginEntity)
                    }}
                >
                    <Tabs
                        centered
                        activeKey={loginType}
                        items={items}
                        onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                    />
                    {loginType === 'account' && (
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: (
                                        <UserOutlined
                                            style={{
                                                color: token.colorText,
                                            }}
                                            className={'prefixIcon'}
                                        />
                                    ),
                                }}
                                placeholder={'用户名: test'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: (
                                        <LockOutlined
                                            style={{
                                                color: token.colorText,
                                            }}
                                            className={'prefixIcon'}
                                        />
                                    ),
                                }}
                                placeholder={'密码: test123'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                            />
                        </>
                    )}
                </LoginFormPage>
            </div>
        </ProConfigProvider>
    );
}

export default Login;