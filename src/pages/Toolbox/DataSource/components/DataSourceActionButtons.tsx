import { DataSourceVO } from '@/repository/toolbox/dataSource';
import {
  deleteDataSourceInfo,
  testConnection,
  updateDataSourceInfo,
} from '@/services/toolbox/dataSourceSerivce';
import { ModalForm, ProFormInstance } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, message } from 'antd';
import React, { FC, useRef } from 'react';
import EditDataSourcePage from './EditDataSourcePage';

interface Props {
  record: DataSourceVO;
  handleRefresh: () => void;
}

const DataSourceActionButtons: FC<Props> = React.memo(
  ({ record, handleRefresh }) => {
    const formRef = useRef<ProFormInstance>();

    const handleDelete = async () => {
      const response = await deleteDataSourceInfo(record.id);
      if (response.code === 200) {
        handleRefresh();
      }
    };

    const test = async () => {
      const value = formRef.current?.getFieldsFormatValue?.();
      const resonse = await testConnection(value);
      if (resonse.code === 200) {
        message.success('测试连接成功');
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
          formRef={formRef}
          trigger={<a>编辑</a>}
          submitter={{
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            render: (props, defaultDoms) => {
              return [
                ...defaultDoms,
                <Button key="test" onClick={test}>
                  测试连接
                </Button>,
              ];
            },
          }}
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
