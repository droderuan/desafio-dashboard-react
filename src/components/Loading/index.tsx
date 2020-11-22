import React from 'react';
import { Spin } from 'antd';

import { Container } from './styles';

interface LoadingProps {
  size?: 'small' | 'large' | 'default';
}

const Loading: React.FC<LoadingProps> = ({ size = 'default' }) => {
  return (
    <Container>
      <Spin tip="Carregando" size={size} />
    </Container>
  );
};

export default Loading;
