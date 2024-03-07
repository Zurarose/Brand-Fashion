import { Flex } from 'antd';
import styled from 'styled-components';

export const SettingsWrapper = styled(Flex).attrs({
  vertical: true,
  gap: 12,
  align: 'center',
  justify: 'center',
})`
  max-width: 350px;
  margin: 0 auto;
  input {
    text-align: center;
  }
  button {
    width: 100%;
  }
`;
