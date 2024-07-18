import {PageQuery, SysUserEntity, SysUserVO} from '@/repository/system/SysUser';
import {createUserInfo, getUserInfoByPage} from '@/services/system/sysUserService';
import {PlusOutlined} from '@ant-design/icons';
import {ActionType, ModalForm, PageContainer, ProColumns, ProTable,} from '@ant-design/pro-components';
import {Button} from 'antd';
import {FC, useRef} from 'react';
import EditSysUserPage from './components/EditSysUserPage';
import UserActionButtons from './components/UserActionButtons';
import RoleTagList from "@/pages/System/SysUser/components/RoleTagList";

const SysUser: FC = () => {
    const actionRef = useRef<ActionType>();

    const handleRefresh = () => {
        actionRef?.current?.reload();
    };

    const columns: ProColumns<SysUserEntity>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            width: 48,
        },
        {
            title: '用户名',
            dataIndex: 'username',
            valueType: 'text',
        },
        {
            title: '姓名',
            dataIndex: 'nickname',
            valueType: 'text',
            search: false,
        },
        {
            title: '头像',
            search: false,
            dataIndex: 'avatar',
            valueType: 'image',
        },
        {
            title: '所属角色',
            search: false,
            dataIndex: 'roleList',
            render: (_, record) => <RoleTagList roleList={record.roleList}/>,
        },
        {
            disable: true,
            title: '状态',
            dataIndex: 'status',
            ellipsis: true,
            valueType: 'select',
            valueEnum: {
                0: {
                    status: 'Error',
                    text: '关闭',
                },
                1: {
                    status: 'Success',
                    text: '开启',
                },
            },
        },
        {
            title: '手机',
            search: false,
            dataIndex: 'phone',
        },
        {
            title: '邮箱',
            search: false,
            dataIndex: 'email',
        },
        {
            title: '创建时间',
            valueType: 'dateTimeRange',
            hideInTable: true,
            search: {
                transform: (value) => {
                    return {
                        startTime: value[0],
                        endTime: value[1],
                    };
                },
            },
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            search: false,
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            valueType: 'dateTime',
            search: false,
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
                <UserActionButtons
                    key={'button'}
                    record={record}
                    handleRefresh={handleRefresh}
                />,
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable<SysUserEntity>
                columns={columns}
                rowKey="id"
                actionRef={actionRef}
                headerTitle="用户管理列表"
                request={async (params) => {
                    const {data} = await getUserInfoByPage(params as PageQuery);
                    return {
                        data: data?.records || [],
                        success: true,
                        total: data.total
                    };
                }}
                toolBarRender={() => [
                    <ModalForm<SysUserVO>
                        key={'addUserInfo'}
                        title="新建用户"
                        width={700}
                        trigger={
                            <Button type="primary">
                                <PlusOutlined/>
                                新建用户
                            </Button>
                        }
                        modalProps={{
                            destroyOnClose: true,
                        }}
                        submitTimeout={2000}
                        onFinish={async (values) => {
                            const data = {
                                ...values,
                                status: values.status ? 1 : 0,
                            };
                            if (values.file) {
                                data.avatar = values.file[0].response.data
                            }
                            const response = await createUserInfo(data);
                            if (response.code === 200) {
                                handleRefresh();
                            }
                            return true;
                        }}
                    >
                        <EditSysUserPage/>
                    </ModalForm>,
                ]}
            />
        </PageContainer>
    );
};

export default SysUser;
