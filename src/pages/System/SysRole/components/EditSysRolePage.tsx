import React, {FC, useState} from "react";
import {ProFormSwitch, ProFormText} from "@ant-design/pro-components";
import {SysRoleEntity} from "@/repository/system/SysRole";
import {Checkbox, Space, Spin, Tree, TreeProps} from "antd";
import {useRequest} from "ahooks";
import {findSysMenuByRoleId} from "@/services/system/sysMenuService";
import {CheckboxChangeEvent} from "antd/lib/checkbox";
import {DataNode} from "antd/lib/tree";
import {useModel} from "@umijs/max";


interface Props {
    record?: SysRoleEntity;
}

const EditSysRolePage: FC<Props> = React.memo(({record}) => {
    const [treeDataNode, setTreeDataNode] = useState<DataNode[]>();
    const [changeEvent, setChangeEvent] = useState<boolean>(false);
    const [changeStrictly, setChangeStrictly] = useState<boolean>(true);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const {setMenuKeys} = useModel('useSelectKeys')
    const {loading} = useRequest(
        async () => {
            const response = await findSysMenuByRoleId({roleId: record?.id});
            return response.data;
        },
        {
            refreshDeps: [record, changeEvent],
            onSuccess(data) {
                const {treeList, menuIds} = data;
                console.log(menuIds)
                setTreeDataNode(treeList)
                setSelectedKeys(menuIds)
            },
        }
    );
    const onCheck: TreeProps['onCheck'] = (checkedKeys: any) => {
        setSelectedKeys(checkedKeys.checked ? checkedKeys.checked : checkedKeys)
        setMenuKeys(checkedKeys.checked ? checkedKeys.checked : checkedKeys)
    };


    const handleChangeExpand = (e: CheckboxChangeEvent) => {
        setChangeEvent(e.target.checked)
    };

    const handleChangeStrictly = (e: CheckboxChangeEvent) => {
        setChangeStrictly(!e.target.checked)
    };

    return <>
        <ProFormText
            width={"lg"}
            name={"roleName"}
            label="请输入角色昵称"
            initialValue={record?.roleName}
            rules={[
                {required: true, message: "请输入角色昵称"},
                {
                    min: 2,
                    max: 20,
                    message: "输入用户名长度为2-20",
                },
            ]}
        />

        <ProFormSwitch name="status" label="状态" initialValue={record?.status}/>


        <Space>
            <span>菜单权限: </span>
            <Checkbox onChange={handleChangeExpand}>展开/折叠</Checkbox>
            <Checkbox onChange={handleChangeStrictly}>父子联动</Checkbox>
        </Space>

        {loading && <Spin tip="Loading" size="large">
            <div className="content"/>
        </Spin>
        }

        {!loading && (
            <Tree style={{paddingTop: '10px'}} checkable treeData={treeDataNode} height={500} onCheck={onCheck}
                  defaultExpandAll={changeEvent} checkStrictly={changeStrictly} defaultCheckedKeys={selectedKeys}/>
        )}

    </>;
});

export default EditSysRolePage;