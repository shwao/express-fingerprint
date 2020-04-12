module.exports = function (next) {
  next(null, {
    dnt: !!this.req.headers.dnt
  });
};