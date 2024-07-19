import {
  DataSourceEntity,
  DataSourceQuery,
  DataSourceVO,
} from '@/repository/toolbox/dataSource';
import { request } from '@umijs/max';

/**
 * 分页获取数据源列表
 * @param params
 */
export async function getDataSourceInfoByPage(params: DataSourceQuery) {
  return request<BaseResponse<PageInfo<DataSourceEntity>>>(
    '/api/secure-toolbox/dataSource/getDataSourceInfoByPage',
    {
      method: 'GET',
      params,
    },
  );
}

/**
 * 数据库连接
 * @param params
 */
export async function connection(params: DataSourceVO) {
  return request<BaseResponse<string>>(
    '/api/secure-toolbox/dataSource/connection',
    {
      method: 'POST',
      data: params,
    },
  );
}

/**
 *
 * @param params 数据库测试连接
 */
export async function testConnection(params: DataSourceVO) {
  return request<BaseResponse<string>>(
    '/api/secure-toolbox/dataSource/testConnection',
    {
      method: 'POST',
      data: params,
    },
  );
}

/**
 *
 * @param params 更新数据库测试连接
 */
export async function updateDataSourceInfo(params: DataSourceVO) {
  return request<BaseResponse<string>>(
    '/api/secure-toolbox/dataSource/updateDataSourceInfo',
    {
      method: 'PUT',
      data: params,
    },
  );
}

/**
 *
 * @param params 删除数据库测试连接
 */
export async function deleteDataSourceInfo(id: string) {
  return request<BaseResponse<string>>(
    `/api/secure-toolbox/dataSource/deleteDataSourceInfo/${id}`,
    {
      method: 'DELETE',
    },
  );
}
