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

export type TProject = {
  projectId: string,
  projectName: string,
  projectDescription: string | null,
  createdAt: Date,
  userId: string,
}

export type TProjectWithAPI = TProject & {
  keyId: string,
  apiKey: string,
}

export type TConfigs = {
  projectId: string,
  key: string,
  value: string,
  env: "production" | "development",
  createdAt: Date,
}