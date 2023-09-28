const product = require('./resources/product');

const {
  config: authentication,
  befores = [],
  afters = [],
} = require('./authentication');

module.exports = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,
  beforeRequest: [...befores],
  afterResponse: [...afters],
  triggers: {},
  searches: {},
  creates: {},
  resources: {
    [product.key]: product
  },
};