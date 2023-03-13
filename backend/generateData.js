const Restaurant = require('./models/restaurantModel');
const Menu = require('./models/menuModel');
const Item = require('./models/productModel');
const Category = require('./models/categoryModel');
const MenuItem = require('./models/MenuItemModel');
const menuItemData = [
    // Appetizers
    {
        name: 'Chicken samosas',
        description: 'Crispy pastry filled with spicy chicken and herbs.',
        price: 120,
        type: 'Appetizers',
        meal: 'Dinner',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/507092443/photo/samosa-8.jpg?s=612x612&w=0&k=20&c=dY0R1V7CUmCPFsBopHWcqctFOCdTzlcF6yTOjjHgGvY=",
        foodPoint: "63f67ded55977415944ab380",
    },
    {
        name: 'Dahi bhalla',
        description: 'Soft lentil dumplings served with yogurt, chutney, and spices.',
        price: 120,
        type: 'Appetizers',
        meal: 'Dinner',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/1039662280/photo/dahi-bhalla-or-dahi-vada.jpg?s=612x612&w=0&k=20&c=Ri4GCTFVmNkNepyai8WgajeTmPno5g1_Cw-XuHwpO1s=",
        foodPoint: "63f67ded55977415944ab380",
    },
    {
        name: 'Aloo tikki',
        description: 'Fried potato patties served with chutney and spices.',
        price: 120,
        type: 'Appetizers',
        meal: 'Dinner',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/1264056146/photo/indian-aloo-tikki-or-potato-cutlet-is-made-out-of-boiled-potatoes-peas-and-various-curry.jpg?s=612x612&w=0&k=20&c=KAvlbE7Le9cLpQQAR1jJw4fUdVOxvTbG8j3fK1tzXYE=",
        foodPoint: "63f67ded55977415944ab380",
    },
    {
        name: 'Chana chaat',
        description: ' Spicy chickpea salad with tomatoes, onions, and chutney.',
        price: 120,
        type: 'Appetizers',
        meal: 'Lunch',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/187306672/photo/chana-masala.jpg?s=612x612&w=0&k=20&c=I0PxXryl2Kx9PYoPhpwV-UxSW8HHLtrXKPf4bUczePs=",
        foodPoint: "63f67ded55977415944ab380",
    },
    {
        name: 'Papdi chaat ',
        description: 'Crispy flour chips topped with chickpeas, potatoes, yogurt, and chutney.',
        price: 120,
        type: 'Appetizers',
        meal: 'Breakfast',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/464757474/photo/bhelpuri-chat-item-india.jpg?s=612x612&w=0&k=20&c=zQel1YfiB0kASVDigpxxo0AO5xmvsRB9j3fKmc04HR4=",
        foodPoint: "63f67ded55977415944ab380",
    },
    // Snacks
    {
        name: 'Chicken tikka',
        description: 'Marinated and grilled chicken served with mint chutney.',
        price: 120,
        type: 'Snacks',
        meal: 'Dinner',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://images.pexels.com/photos/12737805/pexels-photo-12737805.jpeg?auto=compress&cs=tinysrgb&w=600",
        foodPoint: "63f67ded55977415944ab380",
    },
    {
        name: 'Seekh kabab',
        description: 'Spicy minced meat skewers cooked on a charcoal grill.',
        price: 120,
        type: 'Snacks',
        meal: 'Dinner',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://images.pexels.com/photos/12842158/pexels-photo-12842158.jpeg?auto=compress&cs=tinysrgb&w=600",
        foodPoint: "63f67ded55977415944ab380",
    },
    {
        name: 'Pakora',
        description: 'Fritters made with vegetables, chicken, or fish and served with chutney.',
        price: 120,
        type: 'Snacks',
        meal: 'Dinner',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/1409923054/photo/brinjal-pakoda-or-pakora.jpg?b=1&s=170667a&w=0&k=20&c=1cv_6hfIrKERhjOqlvzlU2zqWCCf_8nrBaRKYSJpJ7I=",
        foodPoint: "63f67ded55977415944ab380",
    },
    {
        name: 'Bihari kebab',
        description: 'Spicy beef kebabs cooked on a charcoal grill.',
        price: 120,
        type: 'Snacks',
        meal: 'Lunch',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/1198979097/photo/a-traditional-dish-of-kebab-on-a-plate-cooked-on-a-grill-along-with-vegetables.jpg?s=612x612&w=0&k=20&c=axvt_BFtsB0F5hdTsHBXv_j0czKs5qXYeIKHeMsf7pU=",
        foodPoint: "63f67ded55977415944ab380",
    },
    {
        name: 'Samosa chaat',
        description: 'Crispy samosas topped with chana chaat, yogurt, and chutney.',
        price: 120,
        type: 'Snacks',
        meal: 'Breakfast',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/1397944543/photo/curd-samosa-chaat.jpg?s=612x612&w=0&k=20&c=stR6G94OpoCbK8J2ZmN2MK871vrtSRhP09DC1LFoJxE=",
        foodPoint: "63f67ded55977415944ab380",
    },
    // Juices
    {
        name: 'Mango lassi',
        description: ' Yogurt-based drink with mango pulp and spices.',
        price: 120,
        type: 'Juices',
        meal: 'Breakfast',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/857544788/photo/autumn-spicy-pumpkin-drink.jpg?s=612x612&w=0&k=20&c=JcN7U6yrUSydlEdb--K9gSaCHjR8AxH9dgUcA7T8CAs=",
        foodPoint: "63f67ded55977415944ab380",
    },
    {
        name: 'Sugarcane juice',
        description: 'Freshly squeezed juice from sugarcane.',
        price: 120,
        type: 'Juices',
        meal: 'Lunch',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/1265017712/photo/cane-juice-or-garapa-in-plastic-bottle-organic-drink-extracted-from-sugar-cane-milling.jpg?s=612x612&w=0&k=20&c=6jYI-iZAAhDu9OkukTGcmc5H8j8iv5jY1iR7Ku6NqXY=",
        foodPoint: "63f67ded55977415944ab380",
    },
    // Ice cream
    {
        name: 'Falooda',
        description: 'Cold dessert drink made with vermicelli noodles, basil seeds, and ice cream.',
        price: 120,
        type: 'Ice cream',
        meal: 'Breakfast',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/1257816858/photo/amazing-colourful-falooda-an-indian-dessert-felicitous-coupling-of-silky-vermicelli-noodles.jpg?s=612x612&w=0&k=20&c=UvQnCKTbJtwiN6RWXNWSvdtDSPCwSah6ul4HU4VvFt0=",
        foodPoint: "63f67ded55977415944ab380",
    },
    {
        name: 'Kulfi',
        description: 'Creamy ice cream made with condensed milk and flavored with pistachios or saffron.',
        price: 120,
        type: 'Ice cream',
        meal: 'Lunch',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/1285036363/photo/food-kesar-pista-kulfi-on-plate-and-ingredients.jpg?s=612x612&w=0&k=20&c=wOL_919ds6pIwj9h2c06Et2sBp1hZB-POTYd8QUpsD0=",
        foodPoint: "63f67ded55977415944ab380",
    },
    // Tea
    {
        name: 'Chai',
        description: 'Strong black tea brewed with spices and milk.',
        price: 120,
        type: 'tea',
        meal: 'Breakfast',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/1300484768/photo/traditional-middle-eastern-indian-drink-masala-or-karak-chai-closeup.jpg?s=612x612&w=0&k=20&c=PJFT9vvXSyxMMX5g7WYSlfwnpRFi4oCWhWKTZBV5rb4=",
        foodPoint: "63f67ded55977415944ab380",
    },
    {
        name: 'Kashmiri chai',
        description: 'Pink-colored tea made with green tea leaves, milk, and spices.',
        price: 120,
        type: 'tea',
        meal: 'Dinner',
        menu: '63f6853d02bc7d4985edef88',
        image: "https://media.istockphoto.com/id/506930645/photo/masala-chai-tea-of-india.jpg?s=612x612&w=0&k=20&c=n2bZELoQywbiYCTFR2MeLELfwS73Mm5mlet6GYCdFuA=",
        foodPoint: "63f67ded55977415944ab380",
    },

]

const populate = async () => {
    try {
        // get the menu to associate with the items
        const menu = await Menu.findOne({
            _id: "63f6853d02bc7d4985edef88",
            image: ""
        });

        // create menu item documents
        for (const item of menuItemData) {
            const menuItem = new MenuItem({ ...item });
            await menuItem.save();

            menu.items.push(menuItem._id);
        }

        // save the updated menu document
        await menu.save();

        console.log("Menu items created successfully!", menu);
    } catch (error) {
        console.error(error);
    }
};
// const menuId = '63f6855d02bc7d4985edef8c';
// const foodPointId = '63f67e8855977415944ab382';
// const populate = async () => {
//     try {
//         const result = await MenuItem.updateMany(
//             { menu: menuId },
//             { $set: { foodPoint: foodPointId } }
//         );

//         console.log(`${result.nModified} menu items updated`);
//     } catch (error) {
//         console.error(error);
//     }
// };


module.exports = populate;