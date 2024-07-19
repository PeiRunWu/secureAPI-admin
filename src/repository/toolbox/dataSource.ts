export interface DataSourceEntity {
  id: string;
  name: string;
  ip: string;
  port: string;
  tableName: string;
  username: string;
  password: string;
  driverType: number;
}


export interface DataSourceVO {
  id: string;
  name: string;
  ip: string;
  port: string;
  tableName: string;
  username: string;
  password: string;
  driverType: number;
}

export interface DataSourceQuery {
  tableName: string;
  driverType: number;
  name: string;
}
