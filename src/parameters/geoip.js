import geoip from 'geoip-lite';

module.exports = function (next) {
  const geo = geoip.lookup(this.req.ip);

  next(null, {
    geoip: {
      country: geo && geo.country,
      region: geo && geo.region,
      city: geo && geo.city,
      coordinates: {
        latitude: geo && geo.ll[0],
        longitude: geo && geo.ll[1]
      }
    }
  });
}