export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface FullDiaryEntry {
  id: number;
  date: string;
  weather: string //Weather;
  visibility: string //Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<FullDiaryEntry, 'id'>;

export type DiaryEntry = Omit<FullDiaryEntry, 'comment'>;
