import mongoose from 'mongoose';

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
        type: [String], // Array of strings to store component names
        default: []
    }
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
