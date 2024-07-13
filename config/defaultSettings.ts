import {ProLayoutProps} from '@ant-design/pro-layout';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#2F54EB',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: true,
  title: 'secureAPI',
  splitMenus: false,
  pwa: false,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
  token: {
    bgLayout: '#F0F2F5',
    sider: {
      colorMenuBackground :'#fff',
      colorMenuItemDivider: '#dfdfdf',
      colorTextMenu: '#595959',
      colorTextMenuSelected: 'rgba(42,122,251,1)',
      colorBgMenuItemSelected: 'rgba(230,243,254,1)',
    },
  },
};

export default Settings;
