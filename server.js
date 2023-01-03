const express = require("express");
const app = express();
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")('sk_test_51MMHrPGGQj0VnQJSfi0XvzLmsmK2L1S43kurkBDQ6htgR9Z8kdD0SCxWc1QSkmb1yUrG4ZG1lx5jLLCOskrBmQ1d00MPgb7Via');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    //automatic_payment_methods: {
     // enabled: true,
    //},
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/greet", async (req, res) =>{
    res.send("oh yeah, it is working");
});

app.listen(3000, () => console.log("Node server listening on port 3000!"));