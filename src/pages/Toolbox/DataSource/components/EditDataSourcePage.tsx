import { DataSourceVO } from '@/repository/toolbox/dataSource';
import {
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import React, { FC } from 'react';

interface Props {
  record?: DataSourceVO;
}

const EditDataSourcePage: FC<Props> = React.memo(({ record }) => {
  return (
    <>
      <ProFormText
        width={'lg'}
        name={'name'}
        label="请输入数据源名称"
        placeholder="请输入数据源名称"
        rules={[
          { required: true, message: '请输入数据源名称' },
          {
            max: 10,
            message: '输入数据源名称最大长度为10',
          },
        ]}
        initialValue={record?.name}
      />
      <ProFormText
        width={'lg'}
        name={'ip'}
        label="请输入数据源IP"
        placeholder="请输入数据源IP"
        rules={[{ required: true, message: '请输入数据源IP' }]}
        initialValue={record?.ip}
      />
      <ProFormDigit
        label="请输入端口号"
        name="port"
        width="sm"
        placeholder="请输入端口号"
        rules={[{ required: true, message: '请输入端口号' }]}
        initialValue={record ? record.port : 3306}
      />
      <ProFormText
        width={'lg'}
        name={'tableName'}
        label="请输入数据库名"
        placeholder="请输入数据库名"
        rules={[{ required: true, message: '请输入数据库名' }]}
        initialValue={record?.tableName}
      />
      <ProFormText
        width={'lg'}
        name={'username'}
        label="请输入用户名"
        placeholder="请输入用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
        initialValue={record?.username}
      />
      <ProFormText.Password
        width={'lg'}
        name={'password'}
        label="请输入密码"
        placeholder="请输入密码"
        rules={[{ required: true, message: '请输入密码' }]}
      />
      <ProFormSelect
        name="driverType"
        width={'sm'}
        label="请选择数据源驱动"
        valueEnum={{
         0: 'Mysql',
        }}
        placeholder="请选择数据源驱动"
        rules={[{ required: true, message: '请选择数据源驱动' }]}
        initialValue={record?.driverType.toString()}
      />
    </>
  );
});

export default EditDataSourcePage;
