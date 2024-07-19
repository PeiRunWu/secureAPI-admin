import { DataSourceVO } from '@/repository/toolbox/dataSource';
import {
  deleteDataSourceInfo,
  updateDataSourceInfo,
} from '@/services/toolbox/dataSourceSerivce';
import { ModalForm } from '@ant-design/pro-components';
import { Popconfirm, Space } from 'antd';
import React, { FC } from 'react';
import EditDataSourcePage from './EditDataSourcePage';

interface Props {
  record: DataSourceVO;
  handleRefresh: () => void;
}

const DataSourceActionButtons: FC<Props> = React.memo(
  ({ record, handleRefresh }) => {
    const handleDelete = async () => {
      const response = await deleteDataSourceInfo(record.id);
      if (response.code === 200) {
        handleRefresh();
      }
    };

    return (
      <Space>
        <ModalForm<DataSourceVO>
          title="编辑数据连接"
          modalProps={{
            destroyOnClose: true,
          }}
          width={500}
          trigger={<a>编辑</a>}
          onFinish={async (values) => {
            const data = {
              ...values,
              id: record.id,
            };
            const response = await updateDataSourceInfo(data);
            if (response.code === 200) {
              handleRefresh();
            }
            return true;
          }}
        >
          <EditDataSourcePage record={record} />
        </ModalForm>

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
  },
);

export default DataSourceActionButtons;
