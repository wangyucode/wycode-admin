import { User } from '@/models/user';

const USER_KEY = 'wy-admin-user';

export async function saveCurrent(user: User): Promise<any> {
  const userString = JSON.stringify(user);
  return await localStorage.setItem(USER_KEY, userString);
}

export async function getCurrent(): Promise<User | null> {
  const userString = await localStorage.getItem(USER_KEY);
  if (userString) {
    return JSON.parse(userString);
  } else {
    return null;
  }
}
