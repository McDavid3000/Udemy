const Respoistory = require("./repository");

class ProductsRepository extends Respoistory {}

module.exports = new ProductsRepository("products.json");
