import Product from '../models/product.js';

export const addProduct = async (req, res) => {
    const { name, specification, components } = req.body;

    try {
        const newProduct = new Product({ name, specification, components });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
