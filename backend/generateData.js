const Restaurant = require('./models/restaurantModel');
const Menu = require('./models/menuModel');
const Item = require('./models/productModel');
const Category = require('./models/categoryModel');
const products = [
    {
        "name": "Tuna Salad",
        "description": "Fresh greens, tuna, egg, tomato, and onion with balsamic vinaigrette",
        "price": "10",
        "type": "Lunch",
        "category": "Pizza",
        "image": "https://images.unsplash.com/photo-1649925548772-3dbd70852613?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2FsbGFkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "menu": "63f4d8be4f6adaaa0746e007"
    }
    ,
    {
        "name": "Omelette",
        "description": "Three egg omelette with your choice of cheese, veggies, and meat",
        "price": "9",
        "type": "Breakfast",
        "category": "Pizza",
        "image": "https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8T21lbGV0dGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "menu": "63f4d8be4f6adaaa0746e007"
    }
    ,
    {
        "name": "Quesadilla",
        "description": "Grilled chicken or steak with melted cheese, peppers, and onions",
        "price": "11",
        "type": "Lunch",
        "category": "Burger",
        "image": "https://images.unsplash.com/photo-1618040996337-56904b7850b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8UXVlc2FkaWxsYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "menu": "63f4d8be4f6adaaa0746e007"
    }
    ,
    {
        "name": "Hummus and Pita",
        "description": "Homemade hummus with fresh pita bread",
        "price": "8",
        "type": "Snacks",
        "category": "Burger",
        "image": "https://images.unsplash.com/photo-1542444256-164bd32f11fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8SHVtbXVzJTIwYW5kJTIwUGl0YXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        "menu": "63f4d8be4f6adaaa0746e007"
    }
    ,
    {
        "name": "Strawberry Smoothie",
        "description": "Fresh strawberries blended with ice and yogurt",
        "price": "6",
        "type": "Shakes",
        "category": "Sandwich",
        "image": "https://images.unsplash.com/photo-1514994960127-ed3ef9239d11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8U3RyYXdiZXJyeSUyMFNtb290aGllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "menu": "63f4d8be4f6adaaa0746e007"
    }
    ,
    {
        "name": "Orange Juice",
        "description": "Fresh squeezed orange juice",
        "price": "4",
        "type": "Juices",
        "category": "Sandwich",
        "image": "https://plus.unsplash.com/premium_photo-1667543228378-ec4478ab2845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8T3JhbmdlJTIwSnVpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "menu": "63f4d8be4f6adaaa0746e007"
    }
    ,
    {
        "name": "Chocolate Ice Cream",
        "description": "Rich and creamy chocolate ice cream",
        "price": "5",
        "type": "Ice cream",
        "category": "Salad",
        "image": "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hvY29sYXRlJTIwSWNlJTIwQ3JlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "menu": "63f4d8be4f6adaaa0746e007"
    }
    ,
    {
        "name": "Coca-Cola",
        "description": "Classic Coca-Cola in a chilled bottle",
        "price": "3",
        "type": "Soft drinks",
        "category": "Salad",
        "image": "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Q29jYSUyMENvbGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "menu": "63f4d8be4f6adaaa0746e007"
    },

    {
        "name": "Espresso",
        "description": "Strong and rich espresso shot",
        "price": "2",
        "type": "Coffee",
        "category": "Soup",
        "image": "https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8RXNwcmVzc298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "menu": "63f4d8be4f6adaaa0746e007"
    },

    {
        "name": "Green Tea",
        "description": "Loose leaf green tea brewed to perfection",
        "price": "3",
        "type": "Tea",
        "category": "Soup",
        "image": "https://images.unsplash.com/photo-1582650859079-ee63913ecb84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8R3JlZW4lMjBUZWF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        "menu": "63f4d8be4f6adaaa0746e007"
    }
]



module.exports = populate;