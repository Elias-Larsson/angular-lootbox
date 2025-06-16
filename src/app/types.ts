export type User = {
  _id: number;
  name: string;
  email: string;
  password: string;
  ownedItems: number[];
}

export type Item = {
  _id: number;
  itemName: string; 
  value: number;
  rarity: string;
  creatorId: string;
}