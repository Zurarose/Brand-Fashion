import { Spin } from 'antd';
import React from 'react';
import { LoaderWrapper } from './styles';

export const LoadingScreen = () => {
  return (
    <LoaderWrapper>
      <Spin size="large" />
    </LoaderWrapper>
  );
};
