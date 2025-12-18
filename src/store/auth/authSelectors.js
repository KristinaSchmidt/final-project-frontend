export const selectAuthRequest = (store) => {
  return {
    loading: store.auth.loading,
    error: store.auth.error,
    isRegisterSuccess: store.auth.isRegisterSuccess,
  };
};


export const selectToken = (store) => store.auth.accessToken;

export const selectUser = (state) => state.auth.user;


export const selectAccessToken = (store) => store.auth.accessToken;


export const selectRefreshToken = (store) => store.auth.refreshToken;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

