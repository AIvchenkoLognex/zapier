const _sharedBaseUrl = process.env.URL + '/entity';
const _mainUrl = _sharedBaseUrl + '/product';

const getProduct = (z, bundle) => {

    return z
        .request({
            url: `${_mainUrl}/${bundle.inputData.id}`,
        })
        .then((response) => response.data);
};
const listProducts = (z, bundle) => {
    return z
        .request({
            url: _mainUrl
        })
        .then((response) => response.data);
};

const createProduct = (z, bundle) => {
    const requestOptions = {
        url: _mainUrl,
        method: 'POST',
        body: {
            name: bundle.inputData.name
        },
        headers: {
            'content-type': 'application/json',
        },
    };

    return z.request(requestOptions).then((response) => response.data);
};

const searchProduct = (z, bundle) => {
    return z
        .request({
            url: _mainUrl,
            params: {
                filter: 'name=' + bundle.inputData.name,
            },
        })
        .then((response) => {
            const matchingProducts = response.data;

            // Only return the first matching recipe
            if (matchingProducts && matchingProducts.length) {
                return [matchingProducts[0]];
            }

            return [];
        });
};

const sample = {
    id: "a25acf93-16db-11e7-7a69-971100003486",
    name: 'Best Spagetti Ever'
};

// This file exports a Recipe resource. The definition below contains all of the keys available,
// and implements the list and create methods.
module.exports = {
    key: 'product',
    noun: 'Product',
    // The get method is used by Zapier to fetch a complete representation of a record. This is helpful when the HTTP
    // response from a create call only return an ID, or a search that only returns a minimuml representation of the
    // record. Zapier will follow these up with the get() to retrieve the entire object.
    get: {
        display: {
            label: 'Get Product',
            description: 'Gets a product.',
        },
        operation: {
            inputFields: [{key: 'id', required: true}],
            perform: getProduct,
            sample: sample,
        },
    },
    // The list method on this resource becomes a Trigger on the app. Zapier will use polling to watch for new records
    // list: {
    //     display: {
    //         label: 'New Product',
    //         description: 'Trigger when a new product is added.',
    //     },
    //     operation: {
    //         perform: listProducts,
    //         sample: sample,
    //     },
    // },
    // If your app supports webhooks, you can define a hook method instead of a list method.
    // Zapier will turn this into a webhook Trigger on the app.
    // hook: {
    //
    // },

    // The create method on this resource becomes a Write on this app
    create: {
        display: {
            label: 'Create Product',
            description: 'Creates a new product.',
        },
        operation: {
            inputFields: [
                {key: 'name', required: true, type: 'string'}
            ],
            perform: createProduct,
            sample: sample,
        },
    },
    // The search method on this resource becomes a Search on this app
    search: {
        display: {
            label: 'Find Product',
            description: 'Finds an existing product by name.',
        },
        operation: {
            inputFields: [{key: 'name', required: true, type: 'string'}],
            perform: searchProduct,
            sample: sample,
        },
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: sample,

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
        {key: 'id', label: 'ID'},
        {key: 'name', label: 'Name'}
    ],
};