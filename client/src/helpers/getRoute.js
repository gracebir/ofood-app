export default (routes = []) => ({
    protectedRoutes: routes.filter(route => route.protected),
    protectedRoutesNotNav: routes.filter(route => route.protected && !route.nav),
    unprotectedRoutes: routes.filter(route => !route.nav),
  });
  