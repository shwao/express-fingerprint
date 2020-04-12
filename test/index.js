const httpMocks = require('node-mocks-http');
const Middleware = require('..');
const struct = require('superstruct').struct;

let req, res;

beforeEach(function (done) {
  req = httpMocks.createRequest({
    method: 'GET',
    url: '/test/path?myid=312',
    query: {
      myid: '312'
    },
    headers: {
      'accept': '*/*',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7',
      'dnt': '1'
    },
    ip: '140.82.112.4'
  });
  res = httpMocks.createResponse();
  done();
});

it('without option', function (done) {

  const isValid = struct({
    hash: v => !!v.match(/^\w{32}$/),
    components: {
      useragent: {
        browser: {
          family: 'string',
          version: v => !!v.match(/^[0-9.]+$/)
        },
        device: {
          family: 'string',
          version: v => !!v.match(/^[0-9.]+$/)
        },
        os: {
          family: 'string',
          major: v => !!v.match(/^[0-9.]+$/),
          minor: v => !!v.match(/^[0-9.]+$/)
        }
      },
      acceptHeaders: {
        accept: v => v === '*/*',
        language: v => v === 'en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7'
      },
      geoip: {
        country: v => v === 'US',
        region: v => v === '',
        city: v => v === '',
        coordinates: {
          latitude: v => v === 37.751,
          longitude: v => v === -97.822
        }
      },
      ip: v => v === '140.82.112.4',
      dnt: v => v === true
    }
  });

  const middleware = Middleware();

  middleware(req, res, function (err) {
    isValid(req.fingerprint);
    done();
  });
});

it('custom parameter', function (done) {

  const isValid = struct({
    hash: v => !!v.match(/^\w{32}$/),
    components: {
      param1: v => v === 'value1',
      param2: v => v === 'value2'
    }
  });

  const middleware = Middleware([
    function (next) {
      next(null, {
        param1: 'value1'
      })
    },
    function (next) {
      next(null, {
        param2: 'value2'
      })
    },
  ]);

  middleware(req, res, function (err) {
    isValid(req.fingerprint);
    done();
  });
});
