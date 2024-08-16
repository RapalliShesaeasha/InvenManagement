import Product from '../models/product.js';
import Component from '../models/component.js';

export const checkProduct = async (req, res) => {
    const { productName } = req.query;

    try {
        // Find the product by name
        const product = await Product.findOne({ name: productName });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Log the components associated with the product for debugging
        console.log('Product Components:', product.components);

        // Find all components associated with this product
        const components = await Component.find({ name: { $in: product.components } });

        // Log the fetched components from the Component collection
        console.log('Fetched Components:', components);

        if (components.length === 0) {
            return res.status(404).json({ msg: 'Components not found for this product' });
        }

        // Ensure all components are included in the response
        const componentDetails = product.components.map(compName => {
            const foundComponent = components.find(comp => comp.name.toLowerCase() === compName.toLowerCase());
            return foundComponent ? {
                name: foundComponent.name,
                specification: foundComponent.specification,
                quantity: foundComponent.quantity
            } : { name: compName, specification: 'N/A', quantity: 0 };
        });

        // Log the component details being sent in the response
        console.log('Component Details:', componentDetails);

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
