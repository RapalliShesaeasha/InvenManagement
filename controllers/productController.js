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
        // Find the product by name
        const product = await Product.findOne({ name: productName });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Find all components associated with this product
        const components = await Component.find({ name: { $in: product.components } });
        if (components.length === 0) {
            return res.status(404).json({ msg: 'Components not found for this product' });
        }

        // Ensure all components are included in the response
        const componentDetails = product.components.map(compName => {
            const foundComponent = components.find(comp => comp.name === compName);
            return foundComponent ? {
                name: foundComponent.name,
                specification: foundComponent.specification,
                quantity: foundComponent.quantity
            } : null;
        }).filter(comp => comp !== null); // Filter out any null values in case some components were not found

        // Calculate the minimum quantity of products that can be produced based on component quantities
        const minQuantity = Math.min(...componentDetails.map(comp => comp.quantity));

        res.json({
            productName: product.name,
            components: componentDetails,
            canMake: minQuantity
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
