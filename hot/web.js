// web.js
var _ver = new Date();

module.exports = {
  '/foo': (req) => {
    req.response.json({
      data: {
        a: 1,
        b2: 2
      },
      message: 'I am ok'
    })
  },
  '*': function (req) {
    req.response.write("Hello, new word @ " + _ver);
  }
}