import {
  DataSourceEntity,
  DataSourceQuery,
  DataSourceVO,
} from '@/repository/toolbox/dataSource';
import {
  connection,
  getDataSourceInfoByPage,
  testConnection,
} from '@/services/toolbox/dataSourceSerivce';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { FC, useRef } from 'react';
import EditDataSourcePage from './components/EditDataSourcePage';
import DataSourceActionButtons from './components/DataSourceActionButtons';

const DataSource: FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const handleRefresh = () => {
    actionRef?.current?.reload();
  };

  const test = async () => {
    const value = formRef.current?.getFieldsFormatValue?.();
    const resonse = await testConnection(value);
    if (resonse.code === 200) {
      message.success('测试连接成功');
    }
  };

  const columns: ProColumns<DataSourceEntity>[] = [
    {
      title: '数据源名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      valueType: 'text',
      search: false,
    },
    {
      title: '端口号',
      dataIndex: 'port',
      valueType: 'text',
      search: false,
    },
    {
      title: '库名',
      dataIndex: 'tableName',
      valueType: 'text',
    },

    {
      title: '驱动类型',
      dataIndex: 'driverType',
      valueType: 'select',
      valueEnum: {
        0: {
          text: 'Mysql',
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        <DataSourceActionButtons
          key={'button'}
          record={record}
          handleRefresh={handleRefresh}
        />,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<DataSourceEntity>
        actionRef={actionRef}
        columns={columns}
        rowKey={'id'}
        headerTitle={'数据源列表'}
        request={async (params) => {
          const { data } = await getDataSourceInfoByPage(
            params as DataSourceQuery,
          );
          return {
            data: data.records || [],
            success: true,
            total: data.total,
          };
        }}
        toolBarRender={() => [
          <ModalForm<DataSourceVO>
            key={'addUserInfo'}
            formRef={formRef}
            title="新建数据连接"
            width={700}
            trigger={
              <Button type="primary">
                <PlusOutlined />
                新建数据连接
              </Button>
            }
            modalProps={{
              destroyOnClose: true,
            }}
            submitter={{
              resetButtonProps: {
                style: {
                  display: 'none',
                },
              },
              searchConfig: {
                submitText: '连接',
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
            submitTimeout={2000}
            onFinish={async (values) => {
              const response = await connection(values);
              if (response.code === 200) {
                handleRefresh();
              }
              return true;
            }}
          >
            <EditDataSourcePage />
          </ModalForm>,
        ]}
      />
    </PageContainer>
  );
};

export default DataSource;
