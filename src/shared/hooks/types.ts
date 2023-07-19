export type UserDataHook ={
  user: User | undefined;
}

export interface User {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  email_verified: boolean;
  profilePictureUrl: string;
  preferences: Preferences;
}

export type Preferences = {
  locale: string;
  darkTheme: boolean;
  modelExpansion: boolean;
  listView: boolean;
};
