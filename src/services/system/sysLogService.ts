import { SysLogEntity, SysLogQuery } from '@/repository/system/SysLog';
import { request } from '@umijs/max';

/**
 * 删除文件
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
