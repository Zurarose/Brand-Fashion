export type Client = {
  id: string;
  objectId: string;
  fullName: string;
  bonuses: number;
  giftedBonuses: number;
  birthday: string;
  phone: string;
};

export type Purchase = {
  id: string;
  objectId: string;
  price: number;
  bonuseReceived: number;
  date: string;
  usedBonuses: number;
  itemName: string;
};
