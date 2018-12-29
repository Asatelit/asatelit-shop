/*
 * An array of objects, each of which details a shipping method used.
*/
NEWSCHEMA('ShippingLine', (schema) => {
  schema.define('code', 'String(20)'); // A reference to the shipping method.
  schema.define('discounted_price', 'String(20)'); // The price of the shipping method after discounts.
  schema.define('discounted_price_set', 'String(20)'); // The price of the shipping method after discounts in shop and presentment currencies.
  schema.define('price', 'String(20)'); // The price of this shipping method. Can't be negative.
  schema.define('price_set', 'Object'); // The price of the shipping method in shop and presentment currencies.
  schema.define('source', 'String(20)'); // The source of the shipping method.
  schema.define('title', 'String(20)'); // The title of the shipping method.
  schema.define('tax_lines', '[Object]'); // A list of tax line objects, each of which details a tax applicable to this shipping line.
  schema.define('carrier_identifier', 'String(255)'); // A reference to the carrier service that provided the rate. Present when the rate was computed by a third-party carrier service.
  schema.define('requested_fulfillment_service_id', 'String(255)'); // A reference to the fulfillment service that is being requested for the shipping method. Present if the shipping method requires processing by a third party fulfillment service; null otherwise.
});

/*
 * A list of line item objects, each containing information about an item in the order.
*/
NEWSCHEMA('LineItem', (schema) => {
  schema.define('fulfillable_quantity', Number); // The amount available to fulfill, calculated as follows: quantity - max(refunded_quantity, fulfilled_quantity) - pending_fulfilled_quantity - open_fulfilled_quantity
  schema.define('fulfillment_service', 'String(20)'); // The service provider that's fulfilling the item. Valid values: manual, or the name of the provider, such as amazon or shipwire.
  schema.define('fulfillment_status', ['fulfilled', 'partial', 'partial', 'not_eligible']); // How far along an order is in terms line items fulfilled. Valid values: null, fulfilled, partial, and not_eligible.
  schema.define('grams', Number); // The weight of the item in grams.
  schema.define('id', 'UID'); // The ID of the line item.
  schema.define('price', 'String(20)'); // The price of the item before discounts have been applied.
  schema.define('price_set', 'Object'); // The price of the line item in shop and presentment currencies.
  schema.define('product_id', Number); // The ID of the product that the line item belongs to. Can be null if the original product associated with the order is deleted at a later date.
  schema.define('quantity', Number); // The number of items that were purchased.
  schema.define('requires_shipping', Boolean); // Whether the item requires shipping.
  schema.define('sku', 'String(255)'); // The item's SKU (stock keeping unit).
  schema.define('title', 'String(255)'); // The title of the product.
  schema.define('variant_id', Number); // The ID of the product variant.
  schema.define('variant_title', 'String(255)'); // The title of the product variant.
  schema.define('vendor', 'String(255)'); // The name of the item's supplier.
  schema.define('name', 'String(255)'); // The name of the product variant.
  schema.define('gift_card', Boolean); // Whether the item is a gift card. If true, then the item is not taxed or considered for shipping charges.
  schema.define('properties', 'Object'); // An array of custom information for the item that has been added to the cart. Often used to provide product customization options.
  schema.define('taxable', Boolean); // Whether the item was taxable.
  schema.define('tax_lines', '[Object]'); // A list of tax line objects, each of which details a tax applied to the item.
  schema.define('tip_payment_gateway', 'String(255)'); // The payment gateway used to tender the tip, such as shopify_payments. Present only on tips.
  schema.define('tip_payment_method', 'String(255)'); // The payment method used to tender the tip, such as Visa. Present only on tips.
  schema.define('total_discount', 'String(255)'); // The total discount amount applied to this line item. This value is not subtracted in the line item price.
  schema.define('total_discount_set', 'Object'); // The total discount applied to the line item in shop and presentment currencies.
  schema.define('discount_allocations', '[Object]'); // An ordered list of amounts allocated by discount applications. Each discount allocation is associated to a particular discount application.
});

/*
 * An order is a customer's completed request to purchase one or more products from a shop. An order is created
 * when a customer completes the checkout process, during which time they provide an email address or phone
 * number, billing address and payment information.
*/
NEWSCHEMA('Order', (schema) => {
  schema.define('app_id', Number); // The ID of the app that created the order.
  schema.define('billing_address', 'Address'); // The mailing address associated with the payment method. This address is an optional field that won't be available on orders that do not require a payment method.
  schema.define('browser_ip', 'String(45)'); // The IP address of the browser used by the customer when they placed the order.
  schema.define('buyer_accepts_marketing', Boolean); // Whether the customer consented to receive email updates from the shop.
  schema.define('cancel_reason', ['customer', 'fraud', 'inventory', 'declined', 'other']); // The reason why the order was canceled.
  schema.define('cancelled_at', Date); // The date and time ( ISO 8601 format) when the order was canceled.
  schema.define('cart_token', String); // The ID of the cart that's associated with the order.
  schema.define('client_details', 'ClientDetails'); // Information about the browser that the customer used when they placed their order
  schema.define('closed_at', Date); // The date and time (ISO 8601 format) when the order was closed.
  schema.define('created_at', Date); // The autogenerated date and time (ISO 8601 format) when the order was created in Shopify. The value for this property cannot be changed.
  schema.define('currency', 'String(3)'); // The three-letter code (ISO 4217 format) for the currency used for the payment.
  schema.define('customer', 'Customer'); // Information about the customer. The order might not have a customer and apps should not depend on the existence of a customer object. This value might be null if the order was created through Shopify POS.
  schema.define('customer_locale', 'String(20)'); // The two or three-letter language code, optionally followed by a region modifier.
  schema.define('discount_applications', '[DiscountApplication]'); // An ordered list of stacked discount applications.
  schema.define('discount_codes', '[DiscountCode]'); // A list of discount codes to apply to the order.
  schema.define('email', 'Email'); // The customer's email address.
  schema.define('financial_status', ['pending', 'authorized', 'partially_paid', 'paid', 'partially_refunded', 'refunded', 'voided']); // The status of payments associated with the order. Can only be set when the order is created.
  schema.define('fulfillments', 'Fulfillment'); // A list of fulfillments associated with the order.
  schema.define('fulfillment_status', ['fulfilled', 'null', 'partial', 'restocked']); // The order's status in terms of fulfilled line items.
  schema.define('id', 'UID'); // The ID of the order, used for API purposes. This is different from the order_number property, which is the ID used by the shop owner and customer.
  schema.define('landing_site', String); // The URL for the page where the buyer landed when they entered the shop.
  schema.define('line_items', '[LineItem]', true); // A list of line item objects, each containing information about an item in the order.
  schema.define('location_id', Number); // The ID of the physical location where the order was processed.
  schema.define('name', String); // The order name as represented by a number.
  schema.define('note', String); // An optional note that a shop owner can attach to the order.
  schema.define('note_attributes', '[NoteAttribute]'); // Extra information that is added to the order. Appears in the Additional details section of an order details page. Each array entry must contain a hash with name and value keys.
  schema.define('number', Number); // For internal use only. An ID unique to the shop. Numbers are sequential and start at 1000.
  schema.define('order_number', Number); // The ID of the order used by the shop owner and customer. This is different from the id property, which is the ID of the order used by the API.
  schema.define('payment_gateway_names', '[PaymentGatewayName]'); // The list of payment gateways used for the order.
  schema.define('phone', 'Phone'); // The customer's phone number.
  schema.define('presentment_currency', 'String(20)'); // The presentment currency that was used to display prices to the customer.
  schema.define('processed_at', Date); // The date and time (ISO 8601 format) when an order was processed. This value is the date that appears on your orders and that's used in the analytic reports. By default, it matches the created_at value. If you're importing orders from an app or another platform, then you can set processed_at to a date and time in the past to match when the original order was created.
  schema.define('processing_method', ['checkout', 'direct', 'manual', 'offsite', 'express']); // How the payment was processed. Valid values: checkout, direct, manual, offsite, and express.
  schema.define('referring_site', String); // The website where the customer clicked a link to the shop.
  schema.define('refunds', '[Refund]'); // A list of refunds applied to the order.
  schema.define('shipping_address', '[Address]'); // The mailing address to where the order will be shipped. This address is optional and will not be available on orders that do not require shipping.
  schema.define('shipping_lines', '[ShippingLine]'); // An array of objects, each of which details a shipping method used.
  schema.define('source_name', 'String(20)'); // Where the order originated. Can be set only during order creation, and is not writeable afterwards. Values for Shopify channels are protected and cannot be assigned by other API clients: web, pos, shopify_draft_order, iphone, and android. Orders created via the API can be assigned any other string of your choice. If unspecified, then new orders are assigned the value of your app's ID.
  schema.define('subtotal_price', Number); // The price of the order after discounts but before shipping, taxes and tips.
  schema.define('subtotal_price_set', 'SubtotalPrice'); // The subtotal of the order in shop and presentment currencies.
  schema.define('tags', 'String(40)'); // Tags attached to the order, formatted as a string of comma-separated values. Tags are additional short descriptors, commonly used for filtering and searching. Each individual tag is limited to 40 characters in length.
  schema.define('tax_lines', '[TaxLine]'); // An array of tax line objects, each of which details a tax applicable to the order. When creating an order through the API, tax lines can be specified on the order or the line items but not both. Tax lines specified on the order are split across the taxable line items in the created order.
  schema.define('taxes_included', Boolean); // Whether taxes are included in the order subtotal.
  schema.define('test', Boolean); // Whether this is a test order.
  schema.define('token', String); // A unique token for the order.
  schema.define('total_discounts', 'String(20)'); // The total discounts applied to the price of the order.
  schema.define('total_discounts_set', '[TotalDiscount]'); // The total discounts applied to the price of the order in shop and presentment currencies.
  schema.define('total_line_items_price', 'String(20)'); // The sum of all line item prices.
  schema.define('total_line_items_price_set', 'TotalLineItemsPriceSet'); // The total of all line item prices in shop and presentment currencies.
  schema.define('total_price', 'String(20)'); // The sum of all line item prices, discounts, shipping, taxes, and tips (must be positive).
  schema.define('total_price_set', 'TotalPriceSet'); // The total price of the order in shop and presentment currencies.
  schema.define('total_tax', 'String(20)'); // The sum of all the taxes applied to the order (must be positive).
  schema.define('total_tax_set', ''); // The total tax applied to the order in shop and presentment currencies.
  schema.define('total_tip_received', 'TotalTaxSet'); // The total tax applied to the order in shop and presentment currencies.
  schema.define('total_weight', Number); // The sum of all line item weights in grams.
  schema.define('updated_at', Date); // The date and time (ISO 8601 format) when the order was last modified. Filtering orders by updated_at is not an effective method for fetching orders because its value can change when no visible fields of an order have been updated. Use the Webhook and Event APIs to subscribe to order events instead.
  schema.define('user_id', Number); // The ID of the user logged into Shopify POS who processed the order, if applicable.
  schema.define('order_status_url', String); // The URL pointing to the order status web page, if applicable.

  schema.setQuery(($) => {
    DB('orders').find().toArray((err, docs) => $.callback(docs));
  });

  schema.setRead(($) => {
    const id = ($.id || 0).parseInt();
    DB('orders').findOne({ id }, (err, doc) => $.callback(doc));
  });
});
