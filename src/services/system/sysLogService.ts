import { SysLogEntity, SysLogQuery } from '@/repository/system/SysLog';
import { request } from '@umijs/max';

/**
 * 获取日志信息
 * @param params
 */
export async function getLogInfoByPage(params: SysLogQuery) {
  return request<BaseResponse<PageInfo<SysLogEntity>>>(
    '/api/secure-system/sysLog/getLogInfoByPage',
    {
      method: 'GET',
      params,
    },
  );
}

export async function deleteLogInfo(id: string) {
  return request<BaseResponse<string>>(
    `/api/secure-system/sysLog/deleteLogInfo/${id}`,
    {
      method: 'DELETE',
    },
  );
}
