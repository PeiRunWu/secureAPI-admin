import {SysUserVO} from '@/repository/system/SysUser';
import {ProFormSelect, ProFormSwitch, ProFormText, ProFormUploadButton,} from '@ant-design/pro-components';
import {Modal, UploadFile} from 'antd';
import {Rule} from 'antd/es/form';
import {UploadChangeParam} from 'antd/es/upload';
import React, {FC, useState} from 'react';
import {deleteFile} from "@/services/system/sysFileService";
import {getRoleInfoExcludeHidden} from "@/services/system/sysRoleService";

const phoneValidator: Rule = {
    pattern: /0?(13|14|15|17|18|19)[0-9]{9}/,
    message: '请输入正确的手机号',
};

const emailValidator: Rule = {
    pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
    message: '请输入正确的邮箱地址',
};

interface Props {
    record?: SysUserVO;
}

const EditSysUserPage: FC<Props> = React.memo(({record}) => {
    const isCreate = !record;
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<any[]>(
        record?.avatar
            ? [
                {
                    uid: '-1',
                    name: 'avatar.jpg',
                    status: 'done',
                    url: record?.avatar,
                },
            ]
            : [],
    );

    const handlePreview = async (file: any) => {
        setPreviewImage(file.url || file.thumbUrl);
        setPreviewVisible(true);
    };

    const handleChange = ({fileList: newFileList}: UploadChangeParam) => {
        const lastFile = newFileList.slice(-1);
        setFileList(lastFile);
    };

    const handleRemove = async (file: UploadFile) => {
        await deleteFile({path: file.response ? file.response.data : file.url});
    };

    return (
        <>
            {isCreate && (
                <ProFormText
                    width={'lg'}
                    name={'username'}
                    label="请输入用户名"
                    rules={[
                        {required: true, message: '请输入用户名'},
                        {
                            min: 4,
                            max: 10,
                            message: '输入用户名长度为4-10',
                        },
                    ]}
                />
            )}
            <ProFormText
                width={'lg'}
                name="nickname"
                label="请输入姓名"
                tooltip="输入姓名长度为4-10"
                placeholder="请输入姓名"
                rules={[
                    {required: true, message: '请输入姓名'},
                    {
                        min: 4,
                        max: 10,
                        message: '输入姓名长度为4-10',
                    },
                ]}
                initialValue={record?.nickname}
            />
            {isCreate && (
                <ProFormText.Password
                    width={'lg'}
                    name="password"
                    label="请输入密码"
                    hasFeedback
                    rules={[
                        {required: true, message: '请输入密码'},
                        {
                            min: 4,
                            max: 10,
                            message: '输入用户名长度为4-10',
                        },
                    ]}
                />
            )}

            {isCreate && (
                <ProFormText.Password
                    width={'lg'}
                    name="confirm"
                    label="再次输入密码"
                    hasFeedback
                    rules={[
                        {required: true, message: '请输入密码'},
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('您输入的新密码不匹配!'));
                            },
                        }),
                    ]}
                />
            )}

            <ProFormSelect
                name="roleIds"
                label="所属角色"
                initialValue={record?.roleList?.map(role => role.roleId) ?? []}
                showSearch
                fieldProps={{
                    filterOption: () => {
                        return true;
                    },
                    mode: 'multiple'
                }}
                debounceTime={300}
                request={async ({keyWords = ''}) => {
                    const response = await getRoleInfoExcludeHidden();
                    const data = response.data ? response.data.map(item => ({
                        value: item?.id,
                        label: item?.roleName,
                    })) : []; // 如果没有数据，将数据设置为空数组
                    return data.filter(({value, label}) => {
                        return value?.includes(keyWords) || label?.includes(keyWords);
                    });
                }}
            />


            <ProFormText
                width={'lg'}
                name="phone"
                label="请输入手机号"
                placeholder="请输入手机号"
                rules={[phoneValidator]}
                initialValue={record?.phone}
            />
            <ProFormText
                width={'lg'}
                name="email"
                label="请输入邮箱地址"
                placeholder="请输入邮箱地址"
                rules={[emailValidator]}
                initialValue={record?.email}
            />
            <ProFormUploadButton
                name="file"
                label="头像"
                max={1}
                action={'/api/system/sysFile/uploadFile?directory=secure-system'}
                fieldProps={{
                    name: 'file',
                    headers: {
                        token: "1111"
                    },
                    fileList: fileList,
                    listType: 'picture-card',
                    onPreview: handlePreview,
                    onChange: handleChange,
                    onRemove: handleRemove
                }}
            />
            <ProFormSwitch name="status" label="状态" initialValue={record?.status}/>
            <Modal
                open={previewVisible}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
            >
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </>
    );
});

export default EditSysUserPage;
