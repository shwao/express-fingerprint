module.exports = function (next) {
  next(null, {
    ip: this.req.ip
  });
};