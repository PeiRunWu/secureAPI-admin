import { SysLogEntity, SysLogQuery } from '@/repository/system/SysLog';
import { getLogInfoByPage } from '@/services/system/sysLogService';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { FC, useRef } from 'react';

const SysLog: FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<SysLogEntity>[] = [
    {
      title: '菜单描述',
      dataIndex: 'operaDesc',
      valueType: 'text',
    },
    {
      title: '操作模块',
      dataIndex: 'operaModule',
      valueType: 'text',
    },
    {
      title: '主机名',
      dataIndex: 'hostName',
      valueType: 'text',
    },
    {
      title: '请求地址',
      dataIndex: 'requestUri',
      valueType: 'text',
    },
    {
      title: '请求模式',
      dataIndex: 'requestMethod',
      valueType: 'text',
    },
    {
      title: '方法名',
      dataIndex: 'methodName',
      valueType: 'text',
    },
    {
      title: '主机地址',
      dataIndex: 'hostAddress',
      valueType: 'text',
    },
    {
      title: '是否内网',
      dataIndex: 'innerIP',
      valueType: 'select',
      valueEnum: {
        true: {
          status: 'Success',
          text: '是',
        },
        false: {
          status: 'Processing',
          text: '否',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
  ];
  return (
    <PageContainer>
      <ProTable<SysLogEntity>
        actionRef={actionRef}
        columns={columns}
        search={false}
        rowKey={'id'}
        headerTitle={'日志列表'}
        request={async (params) => {
          const { data } = await getLogInfoByPage(params as SysLogQuery);
          return {
            data: data.records || [],
            success: true,
          };
        }}
      />
    </PageContainer>
  );
};
export default SysLog;
