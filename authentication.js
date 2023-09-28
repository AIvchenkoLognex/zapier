const test = async (z, bundle) => {
  const options = {
    url: process.env.URL + '/entity/product',
    method: 'GET'
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

const handleBadResponses = (response, z, bundle) => {
  if (response.status === 401) {
    throw new z.errors.Error(
        // This message is surfaced to the user
        'The username and/or password you supplied is incorrect',
        'AuthenticationError',
        response.status
    );
  }
  return response;
};

module.exports = {
  config: {
    type: 'basic',
    fields: [],
    test,
    connectionLabel: '{{json.username}}',
  },
  befores: [],
  afters: [handleBadResponses],
};
