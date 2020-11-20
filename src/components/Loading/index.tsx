import React from 'react';
import {} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Container } from './styles';

interface LoadingProps {
  size?: number;
}

const Loading: React.FC<LoadingProps> = ({ size = 32 }) => {
  return (
    <Container>
      <LoadingOutlined spin style={{ fontSize: `${size}px` }} />
    </Container>
  );
};

export default Loading;
