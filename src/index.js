import murmurhash3js from 'murmurhash3js';
import async from 'async';
import parameters from './parameters';
import traverse from 'traverse';

const hash = murmurhash3js.x64;

const Fingerprint = function (parameters) {
  if (!parameters || !parameters.length) {
    parameters = [
      Fingerprint.useragent(),
      Fingerprint.acceptHeaders(),
      Fingerprint.geoIp(),
    ];
  }

  return (req, res, next) => {
    const components = {};
    const fingerprint = { hash: null };

    async.eachLimit(
      parameters,
      1,
      (parameter, callback) => {
        parameter.bind({ req })((err, obj) => {
          Object.keys(obj).forEach(key => {
            components[key] = obj[key];
          });
          callback(err);
        });
      },
      err => {
        if (!err) {
          const leaves = traverse(components).reduce(function (acc, x) {
            if (this.isLeaf)
              acc.push(x);

            return acc;
          }, []);

          fingerprint.hash = hash.hash128(leaves.join('~~~'));
          fingerprint.components = components;

          req.fingerprint = fingerprint;
        }

        next();
      }
    )
  }
};

for (const key in parameters) {
  Fingerprint[key] = parameters[key];
}

exports = module.exports = Fingerprint;