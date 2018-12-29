/*
 * The Customer Address resource represents stores the addresses that a customer has entered. Each customer
 * can have multiple addresses associated with them.
 */
NEWSCHEMA('Address', (schema) => {
  schema.define('id', 'UID'); // A unique identifier for the address.
  schema.define('address1', String); // The customer's mailing address
  schema.define('address2', String); // An additional field for the customer's mailing address.
  schema.define('city', 'String(255)'); // The customer's city, town, or village.
  schema.define('country', 'String(50)'); // The customer's country.
  schema.define('country_code', 'String(2)'); // The two-letter country code corresponding to the customer's country.
  schema.define('country_name', 'String(50)'); // The customer’s normalized country name.
  schema.define('company', 'String(255)'); // The customer’s company.
  schema.define('first_name', 'String(50)'); // The customer’s first name.
  schema.define('last_name', 'String(50)'); // The customer’s last name.
  schema.define('name', 'String(101)'); // The customer’s first and last names.
  schema.define('phone', 'Phone'); // The customer’s phone number at this address.
  schema.define('province', 'String(255)'); // The customer’s region name. Typically a province, a state, or a prefecture.
  schema.define('province_code', 'String(2)'); // The two-letter code for the customer’s region.
  schema.define('zip', 'Zip'); // The customer’s postal code, also known as zip, postcode, Eircode, etc.

  schema.setQuery(($) => {
    const id = parseInt($.id || 0);
    DB('customers').findOne({ id }, (err, doc) => $.callback(doc.addresses));
  });

  schema.setRead(($) => {
    const { customer_id, address_id } = $.options;
    const parseId = (id) => parseInt(id || 0);

    DB('customers')
      .aggregate([
        { $match: { id: parseId(customer_id) } },
        {
          $project: {
            addresses: {
              $filter: {
                input: '$addresses',
                as: 'address',
                cond: { $eq: ['$$address.id', parseId(address_id)] },
              },
            },
            _id: 0,
          },
        },
      ])
      .toArray((err, docs) => $.callback(docs[0].addresses[0] || null));
  });
});
