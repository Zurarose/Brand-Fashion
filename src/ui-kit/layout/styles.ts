import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import styled from 'styled-components';

const { Sider, Header, Content } = Layout;

export const SLayout = styled(Layout)`
  min-height: 100vh;
`;

export const SHeader = styled(Header)`
  padding: 0;
  background: ${({ theme }) => theme.palette.primary};
  border-bottom: 4px solid ${({ theme }) => theme.palette.darkBlue};
`;

export const SContent = styled(Content)`
  padding: 24;
  min-height: 280;
  background: ${({ theme }) => theme.palette.secondary};
`;

export const SSider = styled(Sider)``;

export const SMenu = styled(Menu)``;

export const HideButton = styled(Button).attrs({
  type: 'text',
})`
  font-size: '16px';
  width: 64px;
  height: 64px;
  color: ${({ theme }) => theme.palette.secondary};
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  margin: auto;
`;

export const MenuUnfold = styled(MenuUnfoldOutlined).attrs({
  style: { fontSize: '24px' },
})`
  color: ${({ theme }) => theme.palette.secondary};
`;

export const MenuFold = styled(MenuFoldOutlined).attrs({
  style: { fontSize: '24px' },
})`
  color: ${({ theme }) => theme.palette.secondary};
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-left: 16px;
  color: ${({ theme }) => theme.palette.secondary};
  font-family: sans-serif;
`;
