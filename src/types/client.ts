export type Connection<T> = {
  edges: {
    node: T;
  }[];
};

export type PurchaseT = {
  id: string;
  objectId: string;
  price: number;
  bonuseReceived: number;
  date: string;
  usedBonuses: number;
  itemName: string;
};

export type ClientT = {
  id: string;
  objectId: string;
  fullName: string;
  bonuses: number;
  giftedBonuses: number;
  birthday: string;
  phone: string;
  Purchases?: Connection<PurchaseT>;
};
