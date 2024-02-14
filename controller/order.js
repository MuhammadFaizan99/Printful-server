const axios = require("axios");
const { dbConnect } = require("../connection");

const connection = dbConnect();

const createOrder = (req, res) => {
  const apiKey = req.user.ApiKey;

  // Extract order data fields from req.body
  const recipient = {
    name: req.body.recipient.name,
    address1: req.body.recipient.address1,
    city: req.body.recipient.city,
    state_code: req.body.recipient.state_code,
    country_code: req.body.recipient.country_code,
    zip: req.body.recipient.zip,
  };

  const items = [
    {
      variant_id: req.body.items[0].variant_id,
      quantity: req.body.items[0].quantity,
      files: [
        {
          url: req.body.items[0].files[0].url,
        },
      ],
    },
  ];

  // Create the order data object
  const orderData = {
    recipient,
    items,
  };

  // Make a POST request to the Printful API with the order data and API key
  axios
    .post("https://api.printful.com/orders", orderData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    .then((response) => {
      // Handle the success response
      console.log("Order created successfully:", response.data);
      res.status(201).json({ message: "Order created successfully" });
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error creating order:", error.response.data);
      res.status(500).json({ message: "Error creating order" });
    });
};

const getOrders = (req, res) => {
  const apiKey = req.user.ApiKey;

  // Make a GET request to the Printful API to retrieve orders
  axios
    .get("https://api.printful.com/orders", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    .then((response) => {
      // Handle the success response
      console.log("Orders retrieved successfully:", response.data);
      res.status(200).json(response.data); // Return the orders data
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error retrieving orders:", error.response.data);
      res.status(500).json({ message: "Error retrieving orders" });
    });
};

const deleteOrder = (req, res) => {
  const apiKey = req.user.ApiKey;
  const orderId = req.params.order_id; // Get the order_id from the URL parameter

  // Make a DELETE request to the Printful API to delete the order by order_id
  axios
    .delete(`https://api.printful.com/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    .then((response) => {
      // Handle the success response
      res
        .status(200)
        .json({ message: "Order deleted successfully", data: response.data });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error deleting order", data: error.response.data });
    });
};

const updateOrder = (req, res) => {
  const apiKey = req.user.ApiKey;
  const orderId = req.params.order_id; // Get the order_id from the URL parameter

  // Extract order data fields from req.body for updating
  const updateData = {
    recipient: {
      name: req.body.recipient.name,
      address1: req.body.recipient.address1,
      city: req.body.recipient.city,
      state_code: req.body.recipient.state_code,
      country_code: req.body.recipient.country_code,
      zip: req.body.recipient.zip,
    },
    items: [
      {
        variant_id: req.body.items[0].variant_id,
        quantity: req.body.items[0].quantity,
        files: [
          {
            url: req.body.items[0].files[0].url,
          },
        ],
      },
    ],
  };

  axios
    .put(`https://api.printful.com/orders/${orderId}`, updateData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
    .then((response) => {
      res
        .status(200)
        .json({ message: "Order updated successfully", data: response.data });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error updating order", data: error.response.data });
    });
};

module.exports = { createOrder, getOrders, deleteOrder, updateOrder };
