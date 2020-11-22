export default interface ICreateAssetDTO {
  name: string;
  type: string;
  modelName: string;
  description: string;
  state: string;
  healthscore: number;
  unitId: string;
  responsibleId?: string;
}
