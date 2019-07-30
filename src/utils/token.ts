let token: string | null = null;
const WY_TOKEN_KEY = 'WY_TOKEN_KEY';

export function getToken(): string | null {
  return token || localStorage.getItem(WY_TOKEN_KEY);
}

export function setToken(t: string) {
  token = t;
  localStorage.setItem(WY_TOKEN_KEY, t);
}
