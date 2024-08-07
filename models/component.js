import mongoose from 'mongoose';

const ComponentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specification: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const Component = mongoose.models.Component || mongoose.model('Component', ComponentSchema);

export default Component;
