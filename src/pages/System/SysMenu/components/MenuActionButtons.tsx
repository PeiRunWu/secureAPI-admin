import React, {FC} from "react";
import {Popconfirm, Space} from "antd";
import {ModalForm} from "@ant-design/pro-components";
import {SysMenuEntity, SysMenuVO} from "@/repository/system/SysMenu";
import EditSysMenuPage from "@/pages/System/SysMenu/components/EditSysMenuPage";
import {deleteMenuInfo, updateMenuInfo} from "@/services/system/sysMenuService";

interface Props {
    record?: SysMenuEntity;
    handleRefresh: () => void
}

const MenuActionButtons: FC<Props> = ({record, handleRefresh}) => {

    const handleDelete = async () => {
        if (record) {
            const response = await deleteMenuInfo(record.id);
            if (response.code === 200) {
                handleRefresh()
            }
        }
    }
    return (
        <Space>
            <ModalForm<SysMenuVO>
                title={'编辑菜单'}
                width={500}
                modalProps={{
                    destroyOnClose: true,
                }}
                trigger={<a>编辑</a>} onFinish={async (values) => {
                const data = {
                    ...values,
                    id: record?.id,
                    status: Number(values.status)
                }
                const response = await updateMenuInfo(data)
                if (response.code === 200) {
                    handleRefresh()
                }
                return true;
            }}>
                <EditSysMenuPage record={record}/>
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
}

export default MenuActionButtons;