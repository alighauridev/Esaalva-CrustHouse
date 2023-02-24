const Restaurant = require('./models/restaurantModel');
const Menu = require('./models/menuModel');
const Item = require('./models/productModel');
const Category = require('./models/categoryModel');
const MenuItem = require('./models/MenuItemModel');
const menuItemData = [
    {
        name: 'Pepperoni Pizza',
        description: 'Classic pizza topped with pepperoni and mozzarella cheese',
        price: 12.99,
        type: 'Dinner',
        category: 'Pizza',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://plus.unsplash.com/premium_photo-1672498294724-dde3b2e41e19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8UGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: 'Spicy Chicken Burger',
        description: 'Juicy chicken burger with a spicy twist',
        price: 8.99,
        type: 'Lunch',
        category: 'Burger',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyJTIwYW5kJTIwZnJpZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: 'Tuna Sandwich',
        description: 'Sandwich made with fresh tuna and vegetables',
        price: 7.99,
        type: 'Lunch',
        category: 'Sandwich',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8U2FuZHdpY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: 'Greek Salad',
        description: 'Salad made with mixed greens, feta cheese, olives, and tomatoes',
        price: 9.99,
        type: 'Lunch',
        category: 'Salad',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8U2FsYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: 'Tomato Soup',
        description: 'Warm and comforting tomato soup',
        price: 5.99,
        type: 'Lunch',
        category: 'Soup',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8U291cHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: 'Vanilla Milkshake',
        description: 'Classic vanilla milkshake made with real ice cream',
        price: 4.99,
        type: 'Shakes',
        category: 'Shakes',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://images.unsplash.com/photo-1553787499-6f9133860278?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8U2hha2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: 'Green Juice',
        description: 'Healthy juice made with kale, apple, and lemon',
        price: 6.99,
        type: 'Juices',
        category: 'Juices',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://plus.unsplash.com/premium_photo-1667251757355-b3db687473bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8SnVpY2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: 'Chocolate Ice Cream',
        description: 'Rich and creamy chocolate ice cream',
        price: 3.99,
        type: 'Ice cream',
        category: 'Ice cream',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8SWNlJTIwY3JlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: 'Coca-Cola',
        description: 'Classic Coca-Cola in a cold glass bottle',
        price: 1.99,
        type: 'Soft drinks',
        category: 'Soft drinks',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8SnVpY2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: 'Cappuccino',
        description: 'Classic Italian coffee drink made with espresso and steamed milk',
        price: 3.99,
        type: 'Coffee',
        category: 'Coffee',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Q29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }
]

// const populate = async () => {
//     try {
//         // get the menu to associate with the items
//         const menu = await Menu.findOne({
//             _id: "63f6853d02bc7d4985edef88",
//             image: ""
//         });

//         // create menu item documents
//         for (const item of menuItemData) {
//             const menuItem = new MenuItem({ ...item });
//             await menuItem.save();

//             menu.items.push(menuItem._id);
//         }

//         // save the updated menu document
//         await menu.save();

//         console.log("Menu items created successfully!", menu);
//     } catch (error) {
//         console.error(error);
//     }
// };
const menuId = '63f6855d02bc7d4985edef8c';
const foodPointId = '63f67e8855977415944ab382';
const populate = async () => {
    try {
        const result = await MenuItem.updateMany(
            { menu: menuId },
            { $set: { foodPoint: foodPointId } }
        );

        console.log(`${result.nModified} menu items updated`);
    } catch (error) {
        console.error(error);
    }
};


module.exports = populate;