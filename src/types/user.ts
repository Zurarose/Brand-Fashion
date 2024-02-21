export type User = {
  id: string;
  objectId: string;
};

export type Viewer = {
  sessionToken: string;
  user: User;
} | null;
