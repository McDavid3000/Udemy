const express = require("express");
const cartsRepo = require("../repositories/carts");
const productsRepo = require("../repositories/products");
const cartShowTemplate = require("../views/carts/show");

const router = express.Router();

//recieve a post request to add item to cart
router.post("/cart/products", async (req, res) => {
  //figure out the cart? new, existing?
  let cart;

  if (!req.session.cartId) {
    //we dont have cart so neeed to create
    //store cart id on req.session.cartId prop
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    //we have a cart get from repo
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );
  if (existingItem) {
    existingItem.quantity++;
    // console.log("THISSSSSSSrec.body.cartID " + req.body.productId);
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items,
  });
  res.redirect("/cart");
});

//recieve GET request to show all items in cart
router.get("/cart", async (req, res) => {
  //check user has a cart
  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});
//recive a post request to deltet item from cart
router.post("/cart/products/delete", async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);

  const items = cart.items.filter((item) => item.id !== itemId);

  await cartsRepo.update(req.session.cartId, { items });

  res.redirect("/cart");
});
module.exports = router;
