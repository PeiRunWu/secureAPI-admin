import {Tag} from 'antd';
import React, {FC} from 'react';
import {Role} from "@/repository/system/SysUser";

interface Props {
    roleList: Role[];
}

const RoleTagList: FC<Props> = React.memo(({roleList}) => {
    return (
        <>
            {roleList && roleList.map((role: Role) => (
                <Tag key={role.roleId} color="green">
                    {role.roleName}
                </Tag>
            ))}
        </>
    );
});

export default RoleTagList;
