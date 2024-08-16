import mongoose from 'mongoose';

// Subschema for components with their quantities
const ComponentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

// Main Product schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specification: {
        type: String,
        required: true,
    },
    components: {
        type: [ComponentSchema], // Array of components with quantities
        default: []
    }
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
