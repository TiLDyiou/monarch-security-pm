import {
  DesktopOutlined,
  FundOutlined,
  HomeOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import { DefaultFooter, ProLayout, type ProLayoutProps } from '@ant-design/pro-components';
import { App as AntdApp, ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

dayjs.extend(relativeTime);
dayjs.locale('vi');

// Mirrors docs/ant-design-pro/config/defaultSettings.ts
const settings: ProLayoutProps = {
  navTheme: 'light',
  colorPrimary: '#1677ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: false,
  logo: '/images/common/logo.svg',
};

// 3 separate top-level dashboard items
const route = {
  path: '/',
  routes: [
    {
      path: '/dashboard/analysis',
      name: 'Phân tích',
      icon: <LineChartOutlined />,
    },
    {
      path: '/dashboard/monitor',
      name: 'Giám sát',
      icon: <DesktopOutlined />,
    },
    {
      path: '/dashboard/workplace',
      name: 'Hồ sơ khách hàng',
      icon: <FundOutlined />,
    },
  ],
};

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider locale={viVN} theme={{ token: { colorPrimary: settings.colorPrimary } }}>
      <AntdApp>
        <div style={{ height: '100vh' }}>
          <ProLayout
            {...settings}
            route={route}
            location={{ pathname: location.pathname }}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            
            menuItemRender={(item, dom) => (item.path ? <Link to={item.path}>{dom}</Link> : dom)}
            onMenuHeaderClick={() => navigate('/dashboard/analysis')}
            actionsRender={() => [
              <Link key="home" to="/" title="Về trang chủ" style={{ color: 'inherit' }}>
                <HomeOutlined />
              </Link>,
            ]}
            footerRender={() => (
              <DefaultFooter
                copyright={`${new Date().getFullYear()} Monarch Securities`}
                links={[
                  { key: 'home', title: 'Trang chủ', href: '/' },
                  { key: 'faq', title: 'Câu hỏi thường gặp', href: '/#hoi-dap' },
                ]}
              />
            )}
          >
            <Outlet />
          </ProLayout>
        </div>
      </AntdApp>
    </ConfigProvider>
  );
};

export default DashboardLayout;
