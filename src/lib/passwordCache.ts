const KEY = "wallet-password"

export const setCachedPassword = (pwd: string) => {
  sessionStorage.setItem(KEY, pwd)
}

export const getCachedPassword = (): string | null => {
  return sessionStorage.getItem(KEY)
}

export const clearCachedPassword = () => {
  sessionStorage.removeItem(KEY)
}