import mongoose from 'mongoose';

const ComponentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specification: { type: String, required: true },
    quantity: { type: String, required: true }
});

const Component = mongoose.model('Component', ComponentSchema);

export default Component;
