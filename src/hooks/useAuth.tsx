export const useAuth = () => {
  return {
    user: null,
    session: null,
    loading: false,
    signOut: async () => {
      // Auth removed - implement authentication as needed
    },
  };
};
