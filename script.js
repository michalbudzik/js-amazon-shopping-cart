class User {
  constructor(name) {
    this.name = name;
    this.active = false;
    this.cart = new Cart();
    this.purchases = [];
    this.returns = [];
  }
  // Set User as Active
  setActive() {
    this.active = true;
    return `User ${this.name} has been activated`;
  }
  submitOrder() {
    this.purchases.push(new Order(this.cart));
    this.emptyCart();
    return 'Order has been submitted';
  }
  // Empty Cart
  emptyCart() {
    this.cart = new Cart();
    return 'Cart has been emptied';
  }
  // Check if User Bought Product
  boughtProduct(item) {
    let count = 0;
    for (let i = 0; i < this.purchases.length; i++) {
      if (this.purchases[i].cart.hasProduct(item)) {
        count++;
      }
    }
    return count;
  }
  // Check if User Returned Product
  returnedProduct(item) {
    let count = 0;
    for (let i = 0; i < this.returns.length; i++) {
      if (this.returns[i].cart.hasProduct(item)) {
        count++;
      }
    }
    return count;
  }
  // Submit Product's Return
  submitReturn(item) {
    const productsBought = this.boughtProduct(item);
    const productsReturned = this.returnedProduct(item);
    if (productsBought > productsReturned) {
      this.returns.push(new Order(new Cart([item])));
      return `Return of ${item.name} has been submitted`;
    } else {
      if (!productsBought) {
        return `This client never bought ${item.name}`;
      } else {
        return `This client has already returned ${item.name}`;
      }
    }
  }
}

class Product {
  constructor(name, price, vat = 0) {
    this.name = name;
    this.price = price;
    this.vat = vat;
  }
}

class Cart {
  constructor(products = []) {
    this.products = products;
    this.total = 0;
  }
  // Add Product to Cart
  addProduct(item) {
    this.products.push(item);
    return `${item.name} has beed added to cart`;
  }
  // Remove Product from Cart
  removeProduct(item) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].name === item.name) {
        this.products.splice(i,1);
        return `${item.name} has been removed from cart`;
      }
    }
    return `There is no ${item.name} in user's cart`;
  }
  // Calculate Cart's Total Value incl. VAT 
  calculateTotal(vat = 0) {
    for (let i = 0; i < this.products.length; i++) {
      this.total += this.products[i].price * (1 + this.products[i].vat / 100);
    }
    this.total = (Math.round(this.total * 100) / 100).toFixed(2);
    return `Total price is $${this.total} (incl. VAT)`;
  }
  // Display Cart
  displayCart() {
    return `You have ${this.products.length} products in your cart`;
  }
  // Check if Product Exists in Cart
  hasProduct(item) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].name === item.name) {
        return true;
      }
    }
    return false;
  }
}

class Order {
  constructor(cart) {
    this.cart = cart;
    this.date = new Date();
  }
}

const fridge = new Product('Fridge', 220);
const microwave = new Product('Microwave', 60, 5);
const coffeemaker = new Product('Coffee Maker', 120);
const dishwasher = new Product('Dish Washer', 200);
const sink = new Product('Sink', 40);

const client1 = new User('John Doe');

console.log(client1.setActive());
console.log(client1.cart.addProduct(fridge));
console.log(client1.cart.displayCart());
console.log(client1.emptyCart());
console.log(client1.cart.displayCart());
console.log(client1.cart.addProduct(fridge));
console.log(client1.cart.addProduct(dishwasher));
console.log(client1.cart.displayCart());
console.log(client1.cart.removeProduct(fridge));
console.log(client1.cart.displayCart());
console.log(client1.cart.removeProduct(fridge));
console.log(client1.cart.addProduct(microwave));
console.log(client1.cart.addProduct(coffeemaker));
console.log(client1.cart.displayCart());
console.log(client1.cart.calculateTotal());
console.log(client1.submitOrder());
console.log(client1.purchases);
console.log(client1.cart.displayCart());
console.log(client1.submitReturn(sink));
console.log(client1.submitReturn(coffeemaker));
console.log(client1.submitReturn(coffeemaker));
console.log(client1.returns);




//Implement a cart feature:
// 1. Add items to cart.
// 2. Add 3% tax to item in cart
// 3. Buy item: cart --> purchases
// 4. Empty cart

//Bonus:
// accept refunds.
// Track user history.