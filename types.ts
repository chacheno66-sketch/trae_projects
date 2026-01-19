export type Zone = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Company {
  id: string;
  name: string;
  zone: Zone;
  boothNumber: string;
  tag: string;
  shortDescription: string;
  painPoints: string;
  solution: string;
  teamName: string;
  imageUrl: string;
  likes: number;
}

export type ViewState = 'HOME' | 'HUB' | 'DETAIL';