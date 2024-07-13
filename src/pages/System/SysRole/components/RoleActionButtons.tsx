import React, {FC} from "react";
import {ModalForm} from "@ant-design/pro-components";
import {SysRoleEntity, SysRoleVO} from "@/repository/system/SysRole";
import EditSysRolePage from "@/pages/System/SysRole/components/EditSysRolePage";
import {deleteRoleInfo, updateRoleInfo} from "@/services/system/sysRoleService";
import {Popconfirm, Space} from "antd";
import {useModel} from "@umijs/max";

interface Props {
    record?: SysRoleEntity;
    handleRefresh: () => void
}

const RoleActionButtons: FC<Props> = React.memo(({record, handleRefresh}) => {
    const {menuKeys} = useModel('useSelectKeys')

    const handleDelete = async () => {
        const response = await deleteRoleInfo(record?.id)
        if (response.code === 200) {
            handleRefresh()
        }
    }

    return (
        <Space>
            <ModalForm<SysRoleVO>
                title={'编辑角色'}
                modalProps={{
                    destroyOnClose: true,
                }}
                trigger={<a>编辑</a>} onFinish={async (values) => {
                const data = {
                    ...values,
                    status: values.status ? 1 : 0,
                    id: record?.id
                };
                if (menuKeys) {
                    data.menuIds = menuKeys;
                }
                const response = await updateRoleInfo(data);
                if (response.code === 200) {
                    handleRefresh();
                }
                return true;
            }}>
                <EditSysRolePage record={record}/>
            </ModalForm>
            <Popconfirm
                title="删除数据"
                description="请问是否需要删除该数据?"
                okText="确定"
                cancelText="取消"
                placement="top"
                onConfirm={handleDelete}
            >
                <a style={{color: 'red'}}>删除</a>
            </Popconfirm>
        </Space>
    )
})

export default RoleActionButtons;