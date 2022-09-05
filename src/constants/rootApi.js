const baseUrl = process.env.REACT_APP_API_URL;

// firebase api
export const firebaseAuthApiUrl = process.env.REACT_APP_BASE_AUTH_API;
export const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;

// app api
export const userBaseApi = `${baseUrl}/api/user/users`;
export const trashBaseApi = `${baseUrl}/api/trash/trash`;
export const foodBaseApi = `${baseUrl}/api/product/products`;
export const billBaseApi = `${baseUrl}/api/bill/bills`;
export const saleBaseApi = `${baseUrl}/api/sale/sale`;
