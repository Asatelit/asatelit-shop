/*
* Attaches additional metadata to a shop's resources.
*/
NEWSCHEMA('CustomerMetafield', (schema) => {
  schema.define('key', 'String(30)', true); // An identifier for the metafield (maximum of 30 characters).
  schema.define('namespace', 'String(20)', true); //  A container for a set of metadata (maximum of 20 characters). Namespaces help distinguish between metadata that you created and metadata created by another individual with a similar namespace.
  schema.define('value', '[String(255)]', true); // Information to be stored as metadata.
  schema.define('value_type', ['string', 'integer'], true); // The value type. Valid values: string and integer.
  schema.define('description ', '[String(255)]'); // Additional information about the metafield.
});

/*
* The Customer Address resource represents stores the addresses that a customer has entered. Each customer
* can have multiple addresses associated with them.
*/
NEWSCHEMA('CustomerAddress', (schema) => {
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
});

/*
 * A product represents an individual item for sale in a Areama store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also
 * qualifies as a product, as do services (such as equipment rental, work for hire,
 * customization of another product or an extended warranty).
*/
NEWSCHEMA('Customer', (schema) => {
  schema.define('accepts_marketing', Boolean); // Whether the customer has consented to receive marketing material via email.
  schema.define('addresses', '[CustomerAddress]'); //
  schema.define('currency', 'String(3)'); // The three-letter code (ISO 4217 format) for the currency that the customer used when they paid for their last order. Defaults to the shop currency.
  schema.define('created_at', Date); // The date and time (ISO 8601 format) when the customer was created.
  schema.define('default_address', 'CustomerAddress'); // The default address for the customer.
  schema.define('email', 'Email'); // The unique email address of the customer. Attempting to assign the same email address to multiple customers returns an error.
  schema.define('first_name', 'String(50)'); // The customer's first name.
  schema.define('id', 'UID'); // A unique identifier for the customer.
  schema.define('last_name', 'String(50)'); // The customer's last name.
  schema.define('last_order_id', Number); // The ID of the customer's last order.
  schema.define('last_order_name', String); // The name of the customer's last order. This is directly related to the name field on the Order resource.
  schema.define('metafield', 'CustomerMetafield'); // Attaches additional metadata to a shop's resources.
  schema.define('multipass_identifier', String); // A unique identifier for the customer that's used with Multipass login.
  schema.define('note', String); // A note about the customer.
  schema.define('orders_count', Number); // The number of orders associated with this customer.
  schema.define('phone', 'Phone'); // The unique phone number (E.164 format) for this customer. Attempting to assign the same phone number to multiple customers returns an error. The property can be set using different formats, but each format must represent a number that can be dialed from anywhere in the world.
  schema.define('state', ['disabled', 'invited', 'enabled', 'declined'])(() => 'disabled'); // The state of the customer's account with a shop. The state can be changed in the Shopify admin or by the customer, but not through the API. Default value: disabled.
  schema.define('tags', String); // Tags that the shop owner has attached to the customer, formatted as a string of comma-separated values.
  schema.define('tax_exempt', Boolean); // Whether the customer is exempt from paying taxes on their order. If true, then taxes won't be applied to an order at checkout. If false, then taxes will be applied at checkout.
  schema.define('total_spent', 'String(20)'); // The total amount of money that the customer has spent across their order history.
  schema.define('updated_at', Date); // The date and time (ISO 8601 format) when the customer information was last updated.
  schema.define('verified_email', Boolean); // Whether the customer has verified their email address.

  schema.setQuery(($) => {
    DB('customers').find().toArray((err, docs) => $.callback(docs));
  });

  schema.setGet(($) => {
    const id = ($.id || 0).parseInt();
    DB('customers').findOne({ id }, (err, doc) => $.callback(doc));
  });
});
