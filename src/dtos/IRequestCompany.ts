export interface IRequestCompany {
  _id: string;
  name: string;
  employeers: { name: string }[];
  units: {
    name: string;
    countAssets: number;
    assets: {
      name: string;
      type: string;
      modelName: string;
      description: string;
      state: string;
      healthscore: number;
      image: {
        url: string;
        name: string;
      };
    }[];
  }[];
}
