import { NavigationGuard } from 'vue-router';
import { getInstance } from './index';

export const authGuard: NavigationGuard = (to, from, next) => {
  const authService = getInstance();

  const fn = () => {
    // If the user is authenticated, continue with the route
    if (authService.isAuthenticated) {
      return next();
    }

    // Otherwise, log in
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
    return null;
  };

  // If loading has already finished, check our auth state using `fn()`
  if (!authService.loading) {
    return fn();
  }

  // Watch for the loading property to change before we check isAuthenticated
  authService.$watch('loading', (loading) => {
    if (loading === false) {
      return fn();
    }
    return null;
  });
  return null;
};
