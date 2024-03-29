const Product = require("../models/productModel");

// Create a new product
exports.createProduct = async (req, res) => {
    const { name } = req.body;

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
        return res
            .status(400)
            .json({ message: "Product with this name already exists" });
    }
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("class_id recipe_id");
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("class_id");
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).populate("class_id");
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(204).json();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// const Product = require("../models/productModel");
// const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
// const SearchFeatures = require("../utils/searchFeatures");
// const ErrorHandler = require("../utils/errorHandler");
// const cloudinary = require("cloudinary");

// // Get All Products
// exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
//     const resultPerPage = 12;
//     const productsCount = await Product.countDocuments();
//     // console.log(req.query);

//     const searchFeature = new SearchFeatures(Product.find(), req.query)
//         .search()
//         .filter();

//     let products = await searchFeature.query;
//     let filteredProductsCount = products.length;

//     searchFeature.pagination(resultPerPage);

//     products = await searchFeature.query.clone();

//     res.status(200).json({
//         success: true,
//         products,
//         productsCount,
//         resultPerPage,
//         filteredProductsCount,
//     });
// });

// // Get All Products ---Product Sliders
// exports.getProducts = asyncErrorHandler(async (req, res, next) => {
//     const products = await Product.find();

//     res.status(200).json({
//         success: true,
//         products,
//     });
// });

// // Get Product Details
// exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//         return next(new ErrorHandler("Product Not Found", 404));
//     }

//     res.status(200).json({
//         success: true,
//         product,
//     });
// });

// // Get All Products ---ADMIN
// exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
//     const products = await Product.find();

//     res.status(200).json({
//         success: true,
//         products,
//     });
// });

// // Create Product ---ADMIN
// exports.createProduct = asyncErrorHandler(async (req, res, next) => {
//     let images = [];
//     if (typeof req.body.images === "string") {
//         images.push(req.body.images);
//     } else {
//         images = req.body.images;
//     }

//     const imagesLink = [];

//     for (let i = 0; i < images.length; i++) {
//         const result = await cloudinary.v2.uploader.upload(images[i], {
//             folder: "products",
//         });

//         imagesLink.push({
//             public_id: result.public_id,
//             url: result.secure_url,
//         });
//     }

//     const result = await cloudinary.v2.uploader.upload(req.body.logo, {
//         folder: "brands",
//     });
//     const brandLogo = {
//         public_id: result.public_id,
//         url: result.secure_url,
//     };

//     req.body.brand = {
//         name: req.body.brandname,
//         logo: brandLogo,
//     };
//     req.body.images = imagesLink;
//     req.body.user = req.user.id;

//     let specs = [];
//     req.body.specifications.forEach((s) => {
//         specs.push(JSON.parse(s));
//     });
//     req.body.specifications = specs;

//     const product = await Product.create(req.body);

//     res.status(201).json({
//         success: true,
//         product,
//     });
// });

// // Update Product ---ADMIN
// exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//         return next(new ErrorHandler("Product Not Found", 404));
//     }

//     if (req.body.images !== undefined) {
//         let images = [];
//         if (typeof req.body.images === "string") {
//             images.push(req.body.images);
//         } else {
//             images = req.body.images;
//         }
//         for (let i = 0; i < product.images.length; i++) {
//             await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//         }

//         const imagesLink = [];

//         for (let i = 0; i < images.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(images[i], {
//                 folder: "products",
//             });

//             imagesLink.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }
//         req.body.images = imagesLink;
//     }

//     if (req.body.logo.length > 0) {
//         await cloudinary.v2.uploader.destroy(product.brand.logo.public_id);
//         const result = await cloudinary.v2.uploader.upload(req.body.logo, {
//             folder: "brands",
//         });
//         const brandLogo = {
//             public_id: result.public_id,
//             url: result.secure_url,
//         };

//         req.body.brand = {
//             name: req.body.brandname,
//             logo: brandLogo,
//         };
//     }

//     let specs = [];
//     req.body.specifications.forEach((s) => {
//         specs.push(JSON.parse(s));
//     });
//     req.body.specifications = specs;
//     req.body.user = req.user.id;

//     product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//     });

//     res.status(201).json({
//         success: true,
//         product,
//     });
// });

// // Delete Product ---ADMIN
// exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//         return next(new ErrorHandler("Product Not Found", 404));
//     }

//     for (let i = 0; i < product.images.length; i++) {
//         await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//     }

//     await product.remove();

//     res.status(201).json({
//         success: true,
//     });
// });

// // Create OR Update Reviews
// exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
//     const { rating, comment, productId } = req.body;

//     const review = {
//         user: req.user._id,
//         name: req.user.name,
//         rating: Number(rating),
//         comment,
//     };

//     const product = await Product.findById(productId);

//     if (!product) {
//         return next(new ErrorHandler("Product Not Found", 404));
//     }

//     const isReviewed = product.reviews.find(
//         (review) => review.user.toString() === req.user._id.toString()
//     );

//     if (isReviewed) {
//         product.reviews.forEach((rev) => {
//             if (rev.user.toString() === req.user._id.toString())
//                 (rev.rating = rating), (rev.comment = comment);
//         });
//     } else {
//         product.reviews.push(review);
//         product.numOfReviews = product.reviews.length;
//     }

//     let avg = 0;

//     product.reviews.forEach((rev) => {
//         avg += rev.rating;
//     });

//     product.ratings = avg / product.reviews.length;

//     await product.save({ validateBeforeSave: false });

//     res.status(200).json({
//         success: true,
//     });
// });

// // Get All Reviews of Product
// exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {
//     const product = await Product.findById(req.query.id);

//     if (!product) {
//         return next(new ErrorHandler("Product Not Found", 404));
//     }

//     res.status(200).json({
//         success: true,
//         reviews: product.reviews,
//     });
// });

// // Delete Reveiws
// exports.deleteReview = asyncErrorHandler(async (req, res, next) => {
//     const product = await Product.findById(req.query.productId);

//     if (!product) {
//         return next(new ErrorHandler("Product Not Found", 404));
//     }

//     const reviews = product.reviews.filter(
//         (rev) => rev._id.toString() !== req.query.id.toString()
//     );

//     let avg = 0;

//     reviews.forEach((rev) => {
//         avg += rev.rating;
//     });

//     let ratings = 0;

//     if (reviews.length === 0) {
//         ratings = 0;
//     } else {
//         ratings = avg / reviews.length;
//     }

//     const numOfReviews = reviews.length;

//     await Product.findByIdAndUpdate(
//         req.query.productId,
//         {
//             reviews,
//             ratings: Number(ratings),
//             numOfReviews,
//         },
//         {
//             new: true,
//             runValidators: true,
//             useFindAndModify: false,
//         }
//     );

//     res.status(200).json({
//         success: true,
//     });
// });
