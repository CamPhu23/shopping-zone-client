export const BASE_URL = process.env.REACT_APP_ENVIRONMENT == 'development' ? process.env.REACT_APP_BASE_CLIENT_DEV : process.env.REACT_APP_BASE_CLIENT_PRO;

export const HTTP_HEADER = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  'X-Requested-With': 'XMLHttpRequest',
}