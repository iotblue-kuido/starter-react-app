import {useCallback, useState} from 'react';
import {UN_INITIALIZED_ERROR} from '../../../shared/helpers/common';
import Kuido, {kuidoInstance} from '../index';
// import {ListResponse, Options} from 'kuido-sdk/lib/interfaces/Common';
// import {Asset, AssetData} from 'kuido-sdk/lib/modules/assets';

// export interface AssetsModule {
//   getDeviceAssets(id: string, options?: Options): Promise<AssetData[]>;
//   getAsset(id: string): Promise<Asset>;
//   getAssets(options?: Options): Promise<ListResponse<AssetData[]>>;
// }

export default function useAssets(): any  {
  const [isInitialized, setIsInitialized] = useState<boolean>(
    Kuido.isInitialized,
  );

  Kuido.observeOnInit(() => {
    setIsInitialized(true);
  });

}
