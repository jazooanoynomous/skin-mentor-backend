const express = require("express");
const cookieParser = require("cookie-parser");
const paymentRoutes = require("./routes/Payment");
const app = express();
app.use(express.json({ limit: "10mb" }));

app.use(cookieParser());
app.use("/payments", paymentRoutes);
// Define the port
const port = process.env.PORT || 3001;

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
