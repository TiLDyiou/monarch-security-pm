import {
  DesktopOutlined,
  FundOutlined,
  HomeOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import { DefaultFooter, ProLayout, type ProLayoutProps } from '@ant-design/pro-components';
import { App as AntdApp, ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageToggle from '@/components/ui/language-toggle';

dayjs.extend(relativeTime);

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

const DashboardLayout = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const route = useMemo(
    () => ({
      path: '/',
      routes: [
        {
          path: '/dashboard/analysis',
          name: t.dashboard.nav.analysis,
          icon: <LineChartOutlined />,
        },
        {
          path: '/dashboard/monitor',
          name: t.dashboard.nav.monitor,
          icon: <DesktopOutlined />,
        },
        {
          path: '/dashboard/workplace',
          name: t.dashboard.nav.workplace,
          icon: <FundOutlined />,
        },
      ],
    }),
    [t],
  );

  return (
    <ConfigProvider
      locale={language === 'en' ? enUS : viVN}
      theme={{ token: { colorPrimary: settings.colorPrimary } }}
    >
      <AntdApp>
        <div style={{ height: '100vh' }}>
          <ProLayout
            {...settings}
            route={route}
            location={{ pathname: location.pathname }}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            // ProLayout keeps the menu it built on first render; rename the items from the current language every time
            menuDataRender={(items) =>
              items.map((item) => ({
                ...item,
                name: route.routes.find((r) => r.path === item.path)?.name ?? item.name,
              }))
            }
            menuItemRender={(item, dom) => (item.path ? <Link to={item.path}>{dom}</Link> : dom)}
            onMenuHeaderClick={() => navigate('/')}
            actionsRender={() => [
              <LanguageToggle key="lang" variant="pill" />,
              <Link key="home" to="/" title={t.dashboard.nav.homeTitle} style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
                <HomeOutlined style={{ fontSize: 16 }} />
              </Link>,
            ]}
            footerRender={() => (
              <DefaultFooter
                copyright={`${new Date().getFullYear()} ${t.dashboard.footer.copyright}`}
                links={[
                  { key: 'home', title: t.dashboard.footer.home, href: '/' },
                  { key: 'faq', title: t.dashboard.footer.faq, href: '/#hoi-dap' },
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
