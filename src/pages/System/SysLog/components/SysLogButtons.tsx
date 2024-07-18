import { SysLogEntity } from '@/repository/system/SysLog';
import { deleteLogInfo } from '@/services/system/sysLogService';
import { Popconfirm, Space } from 'antd';
import { FC } from 'react';

interface Props {
  record?: SysLogEntity;
  handleRefresh: () => void;
}

const SysLogButtons: FC<Props> = ({ record, handleRefresh }) => {
  const handleDelete = async () => {
    if (record) {
      const response = await deleteLogInfo(record.id);
      if (response.code === 200) {
        handleRefresh();
      }
    }
  };

  return (
    <Space>
      <Popconfirm
        title="删除数据"
        description="请问是否需要删除该数据?"
        okText="确定"
        cancelText="取消"
        placement="top"
        onConfirm={handleDelete}
      >
        <a style={{ color: 'red' }}>删除</a>
      </Popconfirm>
    </Space>
  );
};

export default SysLogButtons;
