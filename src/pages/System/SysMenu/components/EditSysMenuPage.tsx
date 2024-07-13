import React, {FC} from "react";
import {ProFormDigit, ProFormGroup, ProFormRadio, ProFormSelect, ProFormText} from "@ant-design/pro-components";
import {SysMenuEntity} from "@/repository/system/SysMenu";
import {getMenuTableInfo} from "@/services/system/sysMenuService";
import {Space} from "antd";
import Icon from "@/components/Icon";
import * as Icons from '@ant-design/icons';
import {ProFormDependency} from "@ant-design/pro-form";
import {ProFormTreeSelect} from "@ant-design/pro-form/lib";


interface Props {
    record?: SysMenuEntity;
}

const EditSysMenuPage: FC<Props> = React.memo(({record}) => {

    const iconList = Object.keys(Icons)
        .map((key) => ({
            name: key,
            component: Icons[key as keyof typeof Icons],
        }))
        .filter(
            (icon: any) =>
                typeof icon.component !== 'function' && icon.name !== 'default',
        );

    const iconOptions = iconList.map((item: any) => {
        return {
            value: item.name,
            label: (
                <Space>
                    <Icon name={item.name} value={item.name}/>
                    {item.name}
                </Space>
            ),
        };
    });

    return <>

        <ProFormTreeSelect
            name="parentId"
            label="上级目录"
            initialValue={record ? record?.parentId : '0'}
            allowClear
            secondary
            rules={[{required: true, message: '请选择上级目录'}]}
            request={async () => {
                const response = await getMenuTableInfo();
                let data = response.data;
                data = [{
                    title: '主目录',
                    value: '0',
                    children: data,
                }];
                return data;
            }}
            fieldProps={{
                filterTreeNode: true,
                showSearch: true,
                autoClearSearchValue: true,
                multiple: false,
                treeNodeFilterProp: 'title',
                fieldNames: {
                    label: 'title',
                },
            }}
        />

        <ProFormRadio.Group
            name="menuType"
            label="菜单类型"
            initialValue={record ? record.menuType : 'M'}
            options={[
                {
                    label: '目录',
                    value: 'M',
                },
                {
                    label: '菜单',
                    value: 'C',
                },
                {
                    label: '按钮',
                    value: 'F',
                },
            ]}
        />

        <ProFormDependency name={['menuType']}>
            {({menuType}) => {
                if (menuType === 'M') {
                    return (
                        <ProFormSelect
                            name={'icon'}
                            label="菜单图标"
                            placeholder={'请选择图标'}
                            initialValue={record?.icon}
                            showSearch
                            rules={[{required: true, message: '请选择菜单图标'}]}
                            fieldProps={{
                                filterOption: () => {
                                    return true;
                                },
                            }}
                            debounceTime={300}
                            request={async ({keyWords = ''}) => {
                                return iconOptions.filter(({label}) => {
                                    return label.props.children[1].includes(keyWords);
                                });
                            }}
                        />
                    );
                }
            }}
        </ProFormDependency>

        <ProFormGroup>
            <ProFormText
                label="菜单名称"
                name={'menuName'}
                placeholder={'请输入菜单名称'}
                rules={[
                    {required: true, message: '请输入菜单名称'},
                    {
                        max: 50,
                        message: '输入菜单名称最大长度为50',
                    },
                ]}
                initialValue={record?.menuName}
            />

            <ProFormDigit
                label="显示排序"
                name="orderNum"
                min={0}
                max={20}
                rules={[
                    {required: true, message: '请输入排序'},
                ]}
                fieldProps={{
                    keyboard: true,
                }}
                initialValue={record ? record.orderNum : 0}
            />

            <ProFormDependency name={['menuType']}>
                {({menuType}) => {
                    if (menuType === 'F') {
                        return (
                            <ProFormText
                                name={'perms'}
                                label=" 权限字符"
                                tooltip="控制器中定义的权限字符，如:`/system/user/list`"
                                placeholder={'请输入权限标识'}
                                initialValue={record?.perms}
                            />
                        );
                    }
                    return (

                        <ProFormText
                            name={'component'}
                            label="组件路径"
                            tooltip="访问的组件路径，如：`system/user/index`，默认在`views`目录下"
                            placeholder={'请输入组件路径'}
                            initialValue={record?.component}
                        />
                    )
                }}
            </ProFormDependency>


            <ProFormRadio.Group
                name={'status'}
                label="显示状态"
                initialValue={record ? record.status.toString() : "1"}
                valueEnum={{
                    1: '显示',
                    0: '隐藏',
                }}
            />
        </ProFormGroup>

    </>
})

export default EditSysMenuPage;