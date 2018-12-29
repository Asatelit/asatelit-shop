/*
 * A list of product image objects, each one representing an image
 * associated with the product.
*/
NEWSCHEMA('Image', (schema) => {
  schema.define('id', 'UID')(() => UID()); // Globally unique identifier.
  schema.define('product_id', Number); // Id of the image.
  schema.define('position', Number); // The id of the image's product.
  schema.define('created_at', Date); // The date and time (ISO 8601 format) when the image was created.
  schema.define('updated_at', Date); // // The date and time (ISO 8601 format) when the image was last updated.
  schema.define('width', Number); // The width of the image in pixels.
  schema.define('height', Number); // The height of the image in pixels.
  schema.define('src', String); // The relative path of the product image.
  schema.define('variant_ids', '[Object]'); // The array of attributes for the variant that the image is associated with.
});

/*
 * The Metafield resource allows you to add additional information to other Admin API resources. Metafields can
 * be used in several ways, such as to add a summary to a blog post. You can also use metafields to share
 * information with other Shopify apps.
*/
NEWSCHEMA('ProductMetafield', (schema) => {
  schema.define('id', 'UID')(() => UID()); // Globally unique identifier.
  schema.define('name', 'String(255)'); // The product option’s name.
  schema.define('values', '[String(255)]'); // The corresponding value to the product option name.
});

/*
 * Custom product property names like "Size", "Color", and "Material".
 * Products are based on permutations of these options.
 * A product may have a maximum of 3 options.
 * 255 characters limit each.
*/
NEWSCHEMA('ProductOptions', (schema) => {
  schema.define('created_at', Date)(() => new Date()); // The date and time (ISO 8601 format) when the metafield was created.
  schema.define('description', String); // A description of the information that the metafield contains.
  schema.define('id', 'UID')(() => UID()); // The unique ID of the metafield.
  schema.define('key', 'String(30)', true); // The name of the metafield. Maximum length: 30 characters.
  schema.define('namespace', 'String(20)', true); // A container for a set of metafields. You need to define a custom namespace for your metafields to distinguish them from the metafields used by other apps. Maximum length: 20 characters.
  schema.define('owner_id', Number); // The unique ID of the resource that the metafield is attached to.
  schema.define('owner_resource', 'String(255)'); // The type of resource that the metafield is attached to.
  schema.define('value', Number, true); // The information to be stored as metadata.
  schema.define('value_type', ['String', 'integer', 'json_string'], true); // The metafield's information type. Valid values: string, integer, json_string.
  schema.define('updated_at', Date)(() => new Date()); // The date and time (ISO 8601 format) when the metafield was last updated.
});

/*
 * A variant can be added to a Product resource to represent one version of a product with several options.
 * Product resource will have a variant for every possible combination of its options. Each product can have a
 * maximum of three options and a maximum of 100 variants.
*/
NEWSCHEMA('ProductVariant', (schema) => {
  schema.define('barcode', String); // The barcode, UPC, or ISBN number for the product.
  schema.define('compare_at_price', 'String(255)'); // The original price of the item before an adjustment or a sale.
  schema.define('created_at', Date)(() => new Date()); // The date and time (ISO 8601 format) when the product variant was created.
  schema.define('fulfillment_service', 'String(30)'); // The fulfillment service associated with the product variant. Valid values: manual or the handle of a fulfillment service.
  schema.define('grams', 'String(20)'); // The weight of the product variant in grams.
  schema.define('id', 'UID')(() => UID()); // The unique numeric identifier for the product variant.
  schema.define('image_id', Number); // The unique numeric identifier for a product's image. The image must be associated to the same product as the variant.
  schema.define('inventory_item_id', Number); // The unique identifier for the inventory item, which is used in the Inventory API to query for inventory information.
  schema.define('inventory_management', '[String(255)]'); // The fulfillment service that tracks the number of items in stock for the product variant. If you track the inventory yourself using the admin, then set the value to "areama". Valid values: areama or the handle of a fulfillment service that has inventory management enabled. Must be the same fulfillment service referenced by the fulfillment_service property.
  schema.define('inventory_policy', '[String(255)]'); // Whether customers are allowed to place an order for the product variant when it's out of stock. Valid values: deny: Customers are not allowed to place orders for the product variant if it's out of stock. continue: Customers are allowed to place orders for the product variant if it's out of stock.
  schema.define('inventory_quantity', Number); // An aggregate of inventory across all locations. To adjust inventory at a specific location, use the InventoryLevel resource.
  schema.define('metafields', '[ProductMetafield]'); // Additional customizable information about the product variant.
  schema.define('option', '[String(255)]'); // The custom properties that a shop owner uses to define product variants. You can define three options for a product: option1, option2, option3. Default value: Default Title.
  schema.define('presentment_prices', '[PresentmentPrice]'); // A list of the variant's presentment prices and compare-at prices in each of the shop's enabled presentment currencies. Each price object has the following properties: currency_code: The three-letter code (ISO 4217 format) for one of the shop's enabled presentment currencies.amount: The variant's price or compare-at price in the presentment currency. Requires the header 'X-Shopify-Api-Features': 'include-presentment-prices'.
  schema.define('position', Number); // The order of the product variant in the list of product variants. The first position in the list is 1.
  schema.define('price', '[String(30)]'); // The price of the product variant.
  schema.define('product_id', Number); // The unique numeric identifier for the product.
  schema.define('requires_shipping', Boolean); // Whether a customer needs to provide a shipping address when placing an order for the product variant.
  schema.define('sku', '[String(255)]'); // A unique identifier for the product variant in the shop. Required in order to connect to a FulfillmentService.
  schema.define('taxable', Boolean); // Whether a tax is charged when the product variant is sold.
  schema.define('tax_code', '[String(255)]'); // This parameter applies only to the stores that have the Avalara AvaTax app installed. Specifies the Avalara tax code for the product variant.
  schema.define('title', '[String(255)]'); // The title of the product variant.
  schema.define('updated_at', Date)(() => new Date()); // The date and time when the product variant was last modified. Gets returned in ISO 8601 format.
  schema.define('weight', Number); // The weight of the product variant in the unit system specified with weight_unit.
  schema.define('weight_unit', ['g', 'kg', 'oz', 'lb']); // The unit of measurement that applies to the product variant's weight. If you don't specify a value for weight_unit, then the shop's default unit of measurement is applied. Valid values: g, kg, oz, and lb.
});


/*
 * A product represents an individual item for sale in a Areama store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also
 * qualifies as a product, as do services (such as equipment rental, work for hire,
 * customization of another product or an extended warranty).
*/
NEWSCHEMA('Product', (schema) => {
  schema.define('created_at', Date)(() => new Date()); // The date and time (ISO 8601 format) when the product was created.
  schema.define('body_html', String); // A description of the product. Supports HTML formatting.
  schema.define('handle', String); // A unique human-friendly string for the product. Automatically generated from the product's title. Used by the Liquid templating language to refer to objects.
  schema.define('id', 'UID')(() => UID()); // A unique numeric identifier for the product. Each id is unique across the shop system. No two products will have the same id, even if they're from different shops.
  schema.define('images', 'Image'); // A list of product image objects, each one representing an image associated with the product.
  schema.define('options', '[ProductOptions]'); // The custom product property names like Size, Color, and Material. You can add up to 3 options of up to 255 characters each.
  schema.define('product_type', 'String(255)'); // A categorization for the product used for filtering and searching products.
  schema.define('published_at', Date); // The date and time (ISO 8601 format) when the product was published. Can be set to null to unpublish the product from the Online Store channel.
  schema.define('published_scope', ['web', 'global']); // Whether the product is published to the Point of Sale channel. Valid values: web: The product is published to the Online Store channel but not published to the Point of Sale channel. global: The product is published to both the Online Store channel and the Point of Sale channel.
  schema.define('tags', '[String(255)]'); // A string of comma-separated tags that are used for filtering and search. Each comma-separated tag can have up to 255 characters.
  schema.define('template_suffix', 'String(255)'); // The suffix of the shop template being used.
  schema.define('title', String, true); // The name of the product.
  schema.define('metafields_global_title_tag', String); // The name of the product used for SEO purposes. Generally added to the  <meta name='title'> tag.
  schema.define('metafields_global_description_tag', String); // A description of the product used for SEO purposes. Generally added to the <meta name='description'> tag.
  schema.define('updated_at', Date)(() => new Date()); // The date and time (ISO 8601 format) when the product was last modified.
  schema.define('variants', '[ProductVariant]'); //  A list of product variants, each representing a different version of the product. To retrieve the presentment_prices property on a variant, include the request header 'X-Shopify-Api-Features': 'include-presentment-prices'.
  schema.define('vendor', 'String(255)'); // The name of the product's vendor.

  schema.setQuery(($) => {
    DB('products').find().toArray((err, docs) => $.callback(docs));
  });

  schema.setGet(($) => {
    const id = ($.id || 0).parseInt();
    DB('products').findOne({ id }, (err, doc) => $.callback(doc));
  });
});
