import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import styled from 'styled-components';

const { Sider, Header, Content } = Layout;

export const SLayout = styled(Layout)`
  min-height: 100vh;
`;

export const SHeader = styled(Header)`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const SContent = styled(Content)`
  padding: 24px;
  padding-bottom: 0;
  overflow: hidden;
`;

export const SSider = styled(Sider)``;

export const SMenu = styled(Menu)``;

export const HideButton = styled(Button).attrs({
  type: 'text',
})`
  font-size: '16px';
  width: 64px;
  height: 64px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  margin: auto;
`;

export const MenuUnfold = styled(MenuUnfoldOutlined).attrs({
  style: { fontSize: '24px' },
})``;

export const MenuFold = styled(MenuFoldOutlined).attrs({
  style: { fontSize: '24px' },
})``;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 64px;
  margin-left: 16px;
  font-family: sans-serif;
  color: ${({ theme }) => theme.palette.secondary};
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const HeaderImage = styled.img`
  filter: brightness(400%);
`;
