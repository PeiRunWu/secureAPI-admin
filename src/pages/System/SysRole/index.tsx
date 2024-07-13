import {PageQuery, SysRoleEntity, SysRoleVO} from '@/repository/system/SysRole';
import {ActionType, ModalForm, PageContainer, ProColumns, ProTable,} from '@ant-design/pro-components';
import {FC, useRef} from 'react';
import {createRoleInfo, getRoleInfoByPage} from "@/services/system/sysRoleService";
import RoleActionButtons from "@/pages/System/SysRole/components/RoleActionButtons";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import EditSysRolePage from "@/pages/System/SysRole/components/EditSysRolePage";

const SysRole: FC = () => {
    const actionRef = useRef<ActionType>();

    const handleRefresh = () => {
        actionRef?.current?.reload();
    }

    const columns: ProColumns<SysRoleEntity>[] = [
        {
            title: '角色编号',
            dataIndex: 'index',
            valueType: 'index',
        },
        {
            title: '角色昵称',
            dataIndex: 'roleName',
            valueType: 'text',
        },
        {
            disable: true,
            title: '状态',
            dataIndex: 'status',
            ellipsis: true,
            search: false,
            valueType: 'select',
            valueEnum: {
                0: {
                    status: 'Error',
                    text: '隐藏',
                },
                1: {
                    status: 'Success',
                    text: '显示',
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
                <RoleActionButtons
                    key={'button'}
                    record={record}
                    handleRefresh={handleRefresh}
                />,
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable<SysRoleEntity>
                columns={columns}
                rowKey={'id'}
                actionRef={actionRef}
                headerTitle={'角色管理列表'}
                request={async (params) => {
                    const {data} = await getRoleInfoByPage(params as PageQuery);
                    return {
                        data: data?.records || [],
                        success: true,
                    };
                }}
                toolBarRender={() => [
                    <ModalForm<SysRoleVO>
                        key={'addRoleInfo'}
                        title="新建角色"
                        width={700}
                        trigger={
                            <Button type="primary">
                                <PlusOutlined/>
                                新建角色
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
                            const response = await createRoleInfo(data);
                            if (response.code === 200) {
                                handleRefresh();
                            }
                            return true;
                        }}
                    >
                        <EditSysRolePage/>
                    </ModalForm>,
                ]}
            />
        </PageContainer>
    );
};

export default SysRole;
