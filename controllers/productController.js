import Product from '../models/product.js';
import Component from '../models/component.js';

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

export const checkProduct = async (req, res) => {
    const { productName } = req.query;

    try {
        const product = await Product.findOne({ name: productName });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const components = await Component.find();
        const componentMap = new Map();
        components.forEach(c => componentMap.set(c.name, c.quantity));

        const productComponents = product.components;
        let minQuantity = Number.MAX_VALUE;
        for (let comp of productComponents) {
            if (!componentMap.has(comp)) {
                return res.status(404).json({ msg: `Component ${comp} not found` });
            }
            minQuantity = Math.min(minQuantity, componentMap.get(comp));
        }

        res.json({
            productName: product.name,
            components: productComponents,
            canMake: minQuantity
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
