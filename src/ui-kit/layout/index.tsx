import React from 'react';
import { StockOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { HeaderImage, Logo, SContent, SHeader, SLayout, SSider } from './styles';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../constants/routes';
import Image from '../../assets/header-image.webp';

export const AppLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleRedirect = (to: string) => () => navigate(to);

  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Clients',
      title: routes.clients,
      onClick: handleRedirect(routes.clients),
    },
    {
      key: '2',
      icon: <StockOutlined />,
      label: 'Stats',
      title: routes.stats,
      onClick: handleRedirect(routes.stats),
    },
  ];

  const initKey = items.find((item) => item.title === pathname)?.key || items[0]?.key;

  return (
    <SLayout>
      <SSider trigger={null}>
        <SHeader>
          <Logo>BRAND FASHION</Logo>
        </SHeader>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[initKey]} items={items} />
      </SSider>
      <Layout>
        <SHeader>
          <HeaderImage src={Image} />
        </SHeader>
        <SContent>
          <Outlet />
        </SContent>
      </Layout>
    </SLayout>
  );
};
