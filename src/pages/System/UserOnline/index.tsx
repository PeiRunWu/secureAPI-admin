import { UserOnlineEntity } from '@/repository/system/UserOnline';
import { getUserOnlineInfo, offlineUser } from '@/services/login/loginService';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { FC, useRef } from 'react';

const UserOnline: FC = () => {
  const actionRef = useRef<ActionType>();

  const handlerOffline = async (id: string) => {
    const response = await offlineUser({ id });
    if (response.code === 200) {
      message.success('下线成功');
      actionRef?.current?.reload();
    }
  };

  const columns: ProColumns<UserOnlineEntity>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text',
    },
    {
      title: '登入名称',
      dataIndex: 'hostName',
      valueType: 'text',
    },
    {
      title: '登入地址',
      dataIndex: 'hostAddress',
      valueType: 'text',
    },

    {
      title: '登入浏览器',
      dataIndex: 'browser',
      valueType: 'text',
    },
    {
      title: '登入系统',
      dataIndex: 'os',
    },
    {
      title: '登入时间',
      dataIndex: 'loginTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        <a key="offline" onClick={() => handlerOffline(record.id)}>
          下线
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserOnlineEntity>
        columns={columns}
        search={false}
        headerTitle={'用户在线列表'}
        actionRef={actionRef}
        rowKey="id"
        request={async () => {
          const response = await getUserOnlineInfo();
          return {
            data: response.data || [],
            success: true,
          };
        }}
      />
    </PageContainer>
  );
};

export default UserOnline;
