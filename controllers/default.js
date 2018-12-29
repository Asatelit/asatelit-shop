/*eslint no-invalid-this: off*/

exports.install = function defaultController() {
  // PRODUCT RESOURCE
  // Retrieves a list of products.
  ROUTE('GET    /admin/products                                           *Product --> @query');
  // Retrieve a single product by ID
  ROUTE('GET    /admin/products/{product_id}                              *Product --> @read');
  // Creates a new product.
  ROUTE('POST   /admin/products                                           *Product --> @query');
  // Updates a new product
  ROUTE('PUT    /admin/products/{product_id}                              *Product --> @update');
  // Deletes a product
  ROUTE('DELETE /admin/products/{product_id}                              *Product --> @delete');

  // CUSTOMER RESOURCE
  // Retrieves a list of customers
  ROUTE('GET    /admin/customers                                          *Customer --> @query');
  // Retrieves a single customer
  ROUTE('GET    /admin/customers/{customer_id}                            *Customer --> @read');
  // Creates a customer
  ROUTE('POST   /admin/customers                                          *Customer --> @insert');
  // Updates a customer
  ROUTE('PUT    /admin/customers/{customer_id}                            *Customer --> @update');
  // Deletes a customer.
  ROUTE('DELETE /admin/customers/{customer_id}                            *Customer --> @delete');

  // ORDER RESOURCE
  // Retrieves a list of orders
  ROUTE('GET    /admin/orders                                             *Order --> @query');
  // Retrieves a specific order
  ROUTE('GET    /admin/orders/{order_id}                                  *Order --> @read');
  // Creates an order
  ROUTE('POST   /admin/orders                                             *Order --> @insert');
  // Updates an order
  ROUTE('PUT    /admin/orders/{order_id}                                  *Order --> @update');
  // Deletes an order
  ROUTE('DELETE /admin/orders/{order_id}                                  *Order --> @delete');

  // CUSTOMER ADDRESS RESOURCE
  // Retrieves a list of addresses for a customer
  ROUTE('GET    /admin/customers/{customer_id}/addresses                  *Address --> @query');
  // Retrieves details a single customer address.
  ROUTE('GET    /admin/customers/{customer_id}/addresses/{address_id}     *Address --> @read', json_address_read);
  // Creates a new address for a customer.
  ROUTE('POST   /admin/customers/{customer_id}/addresses                  *Address --> @insert');
  // Updates an existing customer address.
  ROUTE('PUT    /admin/customers/{customer_id}/addresses/{address_id}     *Address --> @update');
  // Removes an address from a customer’s address list.
  ROUTE('DELETE /admin/customers/{customer_id}/addresses/{address_id}     *Address --> @delete');

  // JPG FILES
  F.file('*.jpg', static_jpg);

  // CORS
  CORS('/*', ['get', 'post', 'put', 'delete']);
};

function static_jpg(req, res) {
  // responds
  // this === framework
  res.image(F.path.public(req.url), (image) => {
    // image === FrameworkImage
    image.resize('50%');
    image.quality(80);
    image.minify();
  });
}

function json_address_read(customer_id, address_id) {
  const controller = this;
  controller.$get({ customer_id, address_id }, controller.callback());
}
