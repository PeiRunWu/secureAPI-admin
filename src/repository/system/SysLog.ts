export interface SysLogEntity {
  id: string;
  operaDesc: string;
  operaModule: string;
  hostName: string;
  requestUri: string;
  requestMethod: string;
  methodName: string;
  hostAddress: string;
  innerIP: boolean;
  createTime: string;
}

export interface SysLogQuery {
  menuName: string;
  status: number;
}
