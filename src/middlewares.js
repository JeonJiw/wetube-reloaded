export const localsMiddleware = (req, res, next) => {
  //session middleware 뒤에 와야함
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};
//로그인 안한 유저가 로그인이 필요한 페이지에 접근할 경우
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};
//로그인 한 유저가 로그인 페이지에 갈 경우
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};
