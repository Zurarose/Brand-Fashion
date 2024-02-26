import { Card, Flex } from 'antd';
import styled from 'styled-components';

export const ClientsListWrapper = styled(Flex).attrs({
  vertical: true,
  gap: 12,
})`
  margin-top: 24px;
`;

export const ClientCard = styled(Card).attrs({
  size: 'small',
  bordered: true,
  hoverable: true,
})`
  border-width: 0.2px;
  border-color: ${({ theme }) => theme.palette.primary};
`;