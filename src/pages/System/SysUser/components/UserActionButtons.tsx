import {SysUserVO} from '@/repository/system/SysUser';
import {deleteUserInfo, updateUserInfo,} from '@/services/system/sysUserService';
import {ModalForm} from '@ant-design/pro-components';
import {Popconfirm, Space} from 'antd';
import React, {FC} from 'react';
import EditSysUserPage from './EditSysUserPage';

interface Props {
    record: SysUserVO;
    handleRefresh: () => void;
}

const UserActionButtons: FC<Props> = React.memo(({record, handleRefresh}) => {
    const handleDelete = async () => {
        const response = await deleteUserInfo(record.id);
        if (response.code === 200) {
            handleRefresh();
        }
    };
    return (
        <Space>
            <ModalForm<SysUserVO>
                title="编辑用户信息"
                modalProps={{
                    destroyOnClose: true,
                }}
                width={500}
                trigger={<a>编辑</a>}
                onFinish={async (values) => {
                    const data = {
                        ...values,
                        status: values.status ? 1 : 0,
                        id: record.id,
                    };
                    if (values.file) {
                        data.avatar = values?.file[0]?.response?.data;
                    }
                    const response = await updateUserInfo(data);
                    if (response.code === 200) {
                        handleRefresh();
                    }
                    return true;
                }}
            >
                <EditSysUserPage record={record}/>
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
    );
});

export default UserActionButtons;
