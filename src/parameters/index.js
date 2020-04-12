module.exports = {
  useragent: () => require('./useragent'),
  acceptHeaders: () => require('./acceptHeaders'),
  geoIp: () => require('./geoip'),
  ip: () => require('./ip'),
};