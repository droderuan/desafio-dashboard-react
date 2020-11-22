export interface IUnit {
  _id: string;
  name: string;
  countAssets: number;
  inUse: number;
  underMaintenance: number;
  disable: number;
  onAlert: number;
  onCritical: number;
  assets: {
    _id: string;
    name: string;
    type: string;
    modelName: string;
    description: string;
    state: string;
    healthscore: number;
    avgDecreaseHealthScore: number;
    unit: string;
    responsible: {
      _id: string;
      name: string;
    };
    image: {
      url: string;
      name: string;
    };
  }[];
}
