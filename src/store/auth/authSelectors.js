export const selectAuthRequest = (store) => {
  return {
    loading: store.auth.loading,
    error: store.auth.error,
    isRegisterSuccess: store.auth.isRegisterSuccess,
  };
};


export const selectToken = (store) => store.auth.accessToken;
// aktueller User
export const selectUser = (store) => store.auth.user;

// AccessToken
export const selectAccessToken = (store) => store.auth.accessToken;

// RefreshToken
export const selectRefreshToken = (store) => store.auth.refreshToken;

