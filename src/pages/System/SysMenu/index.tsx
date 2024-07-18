import {FC, useRef, useState} from "react";
import {ActionType, ModalForm, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {SysMenuEntity, SysMenuQuery, SysMenuVO} from "@/repository/system/SysMenu";
import {createMenuInfo, getMenuInfoByPage} from "@/services/system/sysMenuService";
import {Button, Tag} from "antd";
import {PlusOutlined, RollbackOutlined} from "@ant-design/icons";
import EditSysMenuPage from "@/pages/System/SysMenu/components/EditSysMenuPage";
import Icon from "@/components/Icon";
import MenuActionButtons from "@/pages/System/SysMenu/components/MenuActionButtons";


const menuTypeMap = {
    'M': {
        color: 'blue',
        text: '目录',
    },
    'C': {
        color: 'green',
        text: '菜单',
    },
    'F': {
        color: 'volcano',
        text: '按钮',
    }
};

const SysMenu: FC = () => {
    const actionRef = useRef<ActionType>();
    const [parentIds, setParentIds] = useState<string[]>(['0']);

    const handleFetchList = () => {
        actionRef?.current?.reload();
    };

    const columns: ProColumns<SysMenuEntity>[] = [
        {
            title: '菜单名称',
            dataIndex: 'menuName',
            valueType: "text"
        },
        {
            title: '图标',
            dataIndex: 'icon',
            render: (_, record: any) =>
                record.icon ? <Icon name={record.icon}/> : null,
        },
        {
            title: '排序',
            dataIndex: 'orderNum',
            valueType: 'text',
        },
        {
            title: '权限标识',
            dataIndex: 'perms',
            valueType: 'text',
        },
        {
            title: '组件路径',
            dataIndex: 'component',
            valueType: 'text',
        },
        {
            title: '类型',
            dataIndex: 'menuType',
            render: (_, record) => {
                const item = menuTypeMap[record.menuType as keyof typeof menuTypeMap];
                return <Tag color={item.color}> {item.text}</Tag>;
            },
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
        },
        {
            title: '设置',
            dataIndex: 'setting',
            render: (_, record) => (
                <Button
                    type="link"
                    disabled={!record.hasChildren}
                    onClick={() => {
                        setParentIds([...parentIds, record.id]);
                        handleFetchList();
                    }}
                >
                    查看下级
                </Button>
            ),
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
                <MenuActionButtons
                    key={'button'}
                    record={record}
                    handleRefresh={handleFetchList}
                />,
            ],
        },
    ]


    return <PageContainer>
        <ProTable<SysMenuEntity>
            actionRef={actionRef}
            columns={columns}
            search={false}
            rowKey={'id'}
            headerTitle={'菜单列表'}
            request={async (params) => {
                const values = {
                    ...params,
                    parentId: parentIds[parentIds.length - 1]
                };
                const {data} = await getMenuInfoByPage(values as SysMenuQuery);
                return {
                    data: data.records || [],
                    success: true,
                    total: data.total
                };
            }}
            toolBarRender={() => [
                parentIds.length > 1 && (
                    <Button
                        key="back"
                        icon={<RollbackOutlined/>}
                        onClick={() => {
                            const newParentIds = parentIds.slice(0, -1);
                            setParentIds(newParentIds);
                            handleFetchList();
                        }}
                    >
                        返回
                    </Button>
                ),
                <ModalForm<SysMenuVO>
                    key="add"
                    title="添加菜单"
                    modalProps={{
                        destroyOnClose: true,
                    }}
                    width={500}
                    trigger={
                        <Button key="button" icon={<PlusOutlined/>} type="primary">
                            新建
                        </Button>
                    }
                    onFinish={async (values) => {
                        const response = await createMenuInfo(values);
                        if (response.code === 200) {
                            handleFetchList()
                        }
                        return true;
                    }}
                >
                    <EditSysMenuPage/>
                </ModalForm>,
            ]}
        />
    </PageContainer>
}
export default SysMenu