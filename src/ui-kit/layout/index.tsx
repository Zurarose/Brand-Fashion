import React, { PropsWithChildren, useState } from 'react';
import { StockOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { HideButton, Logo, MenuFold, MenuUnfold, SContent, SHeader, SLayout, SSider } from './styles';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <SLayout>
      <SSider trigger={null} collapsible collapsed={collapsed}>
        <SHeader>
          <Logo>BF</Logo>
        </SHeader>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Clients',
            },
            {
              key: '2',
              icon: <StockOutlined />,
              label: 'Stats',
            },
          ]}
        />
        <HideButton icon={collapsed ? <MenuUnfold /> : <MenuFold />} onClick={toggleCollapse} />
      </SSider>
      <Layout>
        <SHeader />
        <SContent>{children}</SContent>
      </Layout>
    </SLayout>
  );
};
