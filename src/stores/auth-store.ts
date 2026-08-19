import { makeAutoObservable } from 'mobx';
import { makePersistable, hydrateStore } from 'mobx-persist-store';

export type TokenType = {
  access: string;
  refresh: string;
};

export type AuthStatus = 'idle' | 'signOut' | 'signIn';

export type ProfileInput = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
};

export class AuthStore {
  token: TokenType | null = null;
  status: AuthStatus = 'idle';
  isFirstTime = true;
  name = '';
  email = '';
  password = '';
  phone = '';
  memberSince = '';

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'AuthStore',
      properties: [
        'token',
        'status',
        'isFirstTime',
        'name',
        'email',
        'phone',
        'memberSince',
      ],
    });
  }

  signIn(tokenData: TokenType, profile?: ProfileInput) {
    this.token = tokenData;
    this.status = 'signIn';
    if (profile) {
      this.applyProfile(profile);
    }
    if (!this.memberSince) {
      this.memberSince = new Date().toISOString();
    }
  }

  updateProfile(profile: ProfileInput) {
    this.applyProfile(profile);
  }

  private applyProfile(profile: ProfileInput) {
    if (profile.name !== undefined) this.name = profile.name.trim();
    if (profile.email !== undefined) this.email = profile.email.trim();
    if (profile.password !== undefined && profile.password.length > 0) {
      this.password = profile.password;
    }
    if (profile.phone !== undefined) this.phone = profile.phone.trim();
  }

  setIsFirstTime(value: boolean) {
    this.isFirstTime = value;
  }

  async signOut() {
    this.token = null;
    this.status = 'signOut';
    this.isFirstTime = true;
    this.name = '';
    this.email = '';
    this.password = '';
    this.phone = '';
    this.memberSince = '';
  }

  hydrate = async (): Promise<void> => {
    await hydrateStore(this);
    if (this.status === 'signIn' && !this.memberSince) {
      this.memberSince = new Date().toISOString();
    }
  };
}
