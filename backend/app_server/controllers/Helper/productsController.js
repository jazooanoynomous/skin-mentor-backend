const Product = require("../../models/Helper/Products");

module.exports = {
  //create product
  createProduct: async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.status(200).json("Product created succesfully");
    } catch (error) {
      res.status(500).json("Failed to create the product");
    }
  },

  //get all products
  getAllProducts: async (req, res) => {
    try {
      // Queries the database to find all products.The await keyword is used to wait for asynchronous operation to complete.
      //The sort method is used to order the results based on createdAt field in descending order(latest products first).
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json("Failed to get products");
    }
  },

  //get one product
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json("Failed to get the product");
    }
  },

  //search product
  searchProduct: async (req, res) => {
    try {
      //aggregate helps us to allow some complex data processing like search
      const result = await Product.aggregate([
        {
          $search: {
            index: "ECommerce",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      res.status(200).json(result);
      console.log("Search Key", req.params.key);
    } catch (error) {
      console.log(error);
      res.status(500).json("Failed to get the products");
    }
  },
};
