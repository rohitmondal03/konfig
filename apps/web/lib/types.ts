export type TUser = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  username: string | null;
  image?: string | null | undefined;
};