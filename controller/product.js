const axios = require("axios");
const { dbConnect } = require("../connection");

const connection = dbConnect();

const createProduct = (req, res) => {
  // Access the user's API key from the req.user object
  const apiKey = req.user.ApiKey;

  // Verify that the API key is valid and proceed to create the product
  if (!apiKey) {
    return res.status(400).json({ message: "API key not found for the user" });
  }

  // Access form data from the request body
  const formData = req.body;

  // Check if the product name is provided in the form data
  if (!formData.name) {
    return res.status(400).json({ message: "Product name is required" });
  }

  // Create the product data in the specified JSON format
  const productData = {
    sync_product: {
      external_id: formData.external_id,
      name: formData.name,
      thumbnail: formData.thumbnail,
      is_ignored: true,
    },
    sync_variants: [
      {
        external_id: formData.variant_external_id,
        variant_id: formData.variant_id,
        retail_price: formData.retail_price,
        is_ignored: true,
        sku: formData.sku,
        files: [
          {
            type: "default",
            url: formData.file_url,
            options: [],
            filename: formData.filename,
            visible: true,
          },
        ],
        options: [
          {
            id: "embroidery_type",
            value: formData.embroidery_type,
          },
        ],
        availability_status: "active",
      },
    ],
  };

  // Make a request to the Printful API using the apiKey
  axios({
    method: "post",
    url: "https://api.printful.com/store/products",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`, // Add the API key to the Authorization header
    },
    data: productData,
  })
    .then((response) => {
      // Handle the successful response from Printful
      const responseData = response.data;
      console.log("Product created successfully:", responseData);
      res.status(201).json({ message: "Product created successfully", data: responseData });
    })
    .catch((error) => {
      // Handle errors, such as an invalid API key or Printful API issues
      console.error("Error creating product:", error.response?.data || error.message);
      res.status(500).json({ message: "Error creating product" });
    });
};

const getProducts = (req, res) => {
  // Access the user's API key from the req.user object
  const apiKey = req.user.ApiKey;

  // Verify that the API key is valid
  if (!apiKey) {
    return res.status(400).json({ message: "API key not found for the user" });
  }

  // Make a GET request to the Printful API using the apiKey
  axios({
    method: "get",
    url: "https://api.printful.com/store/products",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => {
      // Handle the successful response from Printful
      const responseData = response.data;
      console.log("Products fetched successfully:", responseData);
      res.status(200).json({ message: "Products fetched successfully", data: responseData });
    })
    .catch((error) => {
      // Handle errors, such as an invalid API key or Printful API issues
      console.error("Error fetching products:", error.response?.data || error.message);
      res.status(500).json({ message: "Error fetching products" });
    });
};

const deleteProduct = (req, res) => {
  // Access the user's API key from the req.user object
  const apiKey = req.user.ApiKey;

  // Verify that the API key is valid
  if (!apiKey) {
    return res.status(400).json({ message: "API key not found for the user" });
  }

  // Access the external ID from the request parameters
  const id = req.params.id; // Assuming you pass the external ID as a route parameter

  // Make a DELETE request to the Printful API using the apiKey and externalId
  axios({
    method: "delete",
    url: `https://api.printful.com/store/products/${id}`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => {
      // Handle the successful response from Printful
      console.log(`Product with external ID ${id} deleted successfully`);
      res.status(200).json({ message: `Product with external ID ${id} deleted successfully` });
    })
    .catch((error) => {
      // Handle errors, such as invalid API key or Printful API issues
      console.error(`Error deleting product with external ID ${id}:`, error.response?.data || error.message);
      res.status(500).json({ message: `Error deleting product with external ID ${id}` });
    });
};

const updateProduct = (req, res) => {
  // Access the user's API key from the req.user object
  const apiKey = req.user.ApiKey;

  // Verify that the API key is valid
  if (!apiKey) {
    return res.status(400).json({ message: "API key not found for the user" });
  }

  // Access the external ID from the request parameters
  const id = req.params.id; // Assuming you pass the external ID as a route parameter

  // Access form data from the request body
  const formData = req.body;

  // Create the updated product data in the specified JSON format
  const updatedProductData = {
    sync_product: {
        external_id: formData.external_id,
        name: formData.name,
        thumbnail: formData.thumbnail,
        is_ignored: true,
      },
      sync_variants: [
        {
          external_id: formData.variant_external_id,
          variant_id: formData.variant_id,
          retail_price: formData.retail_price,
          is_ignored: true,
          sku: formData.sku,
          files: [
            {
              type: "default",
              url: formData.file_url,
              options: [],
              filename: formData.filename,
              visible: true,
            },
          ],
          options: [
            {
              id: "embroidery_type",
              value: formData.embroidery_type,
            },
          ],
          availability_status: "active",
        },
      ],
  };

  // Make a PUT request to the Printful API using the apiKey and externalId
  axios({
    method: "put",
    url: `https://api.printful.com/store/products/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    data: updatedProductData,
  })
    .then((response) => {
      // Handle the successful response from Printful
      console.log(`Product with external ID ${id} updated successfully`);
      res.status(200).json({ message: `Product with external ID ${id} updated successfully`, data: response.data });
    })
    .catch((error) => {
      // Handle errors, such as invalid API key or Printful API issues
      console.error(`Error updating product with external ID ${id}:`, error.response?.data || error.message);
      res.status(500).json({ message: `Error updating product with external ID ${id}` });
    });
};

module.exports = { createProduct, getProducts, deleteProduct, updateProduct };