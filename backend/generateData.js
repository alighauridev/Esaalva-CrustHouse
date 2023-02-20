const Restaurant = require('./models/restaurantModel');
const Menu = require('./models/menuModel');
const Item = require('./models/productModel');
const Category = require('./models/categoryModel');

// Create some restaurants
const restaurant1 = new Restaurant({
    name: 'Pizza Place',
    description: 'Best pizza in town',
    address: '123 Main St',
    city: 'Anytown',
    menu: "63f01a862fdf9ab3ad64a711"
});
const restaurant2 = new Restaurant({
    name: 'Burger Joint',
    description: 'Juicy burgers and fries',
    address: '456 Elm St',
    city: 'Anytown',
    menu: "63f01a862fdf9ab3ad64a723"
});

// Create some categories
const category1 = new Category({
    name: 'Pizza',
    image: 'https://example.com/pizza.jpg',
});
const category2 = new Category({
    name: 'Burgers',
    image: 'https://example.com/burgers.jpg',
});

// Create some items
const item1 = new Item({
    name: 'Pepperoni Pizza',
    price: 10.99,
    category: 'Pizza',
    description: 'Classic pizza with spicy pepperoni',
    image: 'https://example.com/pepperoni.jpg',
});
const item2 = new Item({
    name: 'Cheeseburger',
    price: 8.99,
    category: 'Burgers',
    description: 'Classic burger with American cheese',
    image: 'https://example.com/cheeseburger.jpg',
});

// Create some menus
const menu1 = new Menu({
    _id: "63f01a862fdf9ab3ad64a711",
    restaurant: restaurant1._id,
    items: [item1._id],
});
const menu2 = new Menu({
    _id: "63f01a862fdf9ab3ad64a723",
    restaurant: restaurant2._id,
    items: [item2._id],
});

// Save the documents to the database


const populate = async () => {
    await category1.save();
    await category2.save();
    await item1.save();
    await item2.save();
    await menu1.save();
    await menu2.save();
    await restaurant1.save();
    await restaurant2.save();

}

module.exports = populate;