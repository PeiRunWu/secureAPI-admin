import {request} from '@umijs/max';

/**
 * 删除文件
 * @param params
 */
export async function deleteFile(params: { path: string }) {
    return request<BaseResponse<string>>(
        '/api/secure-system/sysFile/deleteFile/',
        {
            method: 'POST',
            data: params
        },
    );
}