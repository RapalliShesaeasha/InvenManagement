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
    const productName = decodeURIComponent(req.query.productName).trim(); // Decode and trim the product name

    try {
        // Logging the incoming product name
        console.log(`Searching for product: "${productName}"`);

        // Find the product by name (case-insensitive)
        const product = await Product.findOne({
            name: { $regex: new RegExp(`^${productName}$`, 'i') }
        });

        if (!product) {
            console.log('Product not found');
            return res.status(404).json({ msg: 'Product not found' });
        }

        console.log('Product found:', product);

        // Find all components associated with this product
        const componentNames = product.components;
        console.log('Component names to find:', componentNames);

        const components = await Component.find({ name: { $in: componentNames } });
        console.log('Components found:', components);

        if (components.length === 0) {
            return res.status(404).json({ msg: 'Components not found for this product' });
        }

        // Ensure all components are included in the response
        const componentDetails = componentNames.map(compName => {
            const foundComponent = components.find(comp => comp.name === compName);
            return foundComponent ? {
                name: foundComponent.name,
                specification: foundComponent.specification,
                quantity: foundComponent.quantity
            } : null;
        }).filter(comp => comp !== null);

        console.log('Component details to return:', componentDetails);

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
