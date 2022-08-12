const Respoistory = require("./repository");

class CartsRepository extends Respoistory {}

module.exports = new CartsRepository("carts.json");
