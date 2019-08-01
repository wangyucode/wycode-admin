let token: string | null = null;
const WY_TOKEN_KEY = 'WY_TOKEN_KEY';

export function getToken(): string | null {
  return token || localStorage.getItem(WY_TOKEN_KEY);
}

export function setToken(t: string | null) {
  token = t;
  t ? localStorage.setItem(WY_TOKEN_KEY, t) : localStorage.removeItem(WY_TOKEN_KEY);
}
