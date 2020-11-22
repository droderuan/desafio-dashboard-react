import React, { useCallback, useState } from 'react';

import ListAssets from '../ListAssets';
import DisplayAsset from '../DisplayAsset';
import CreateAsset from '../CreateAsset';

import { Container, Content } from './styles';

const Assets: React.FC = () => {
  const [whichContent, setWhichContent] = useState<
    'list' | 'info' | 'create asset'
  >('list');
  const [displayAssetId, setDisplayAssetid] = useState<string>();

  const handleCreateAsset = useCallback(() => {
    setWhichContent('create asset');
  }, []);

  const handleViewAsset = useCallback((assetId: string) => {
    setWhichContent('info');
    setDisplayAssetid(assetId);
  }, []);

  const handleBack = useCallback(() => {
    setWhichContent('list');
    setDisplayAssetid(undefined);
  }, []);

  return (
    <Container className="background-white">
      <Content>
        {whichContent === 'list' && (
          <ListAssets
            handleViewAsset={handleViewAsset}
            handleCreateAsset={handleCreateAsset}
          />
        )}
        {whichContent === 'info' && (
          <DisplayAsset assetId={displayAssetId} back={handleBack} />
        )}
        {whichContent === 'create asset' && <CreateAsset back={handleBack} />}
      </Content>
    </Container>
  );
};

export default Assets;
