import Component from '../models/component.js';

export const getComponents = async (req, res) => {
    try {
        const components = await Component.find();
        res.json(components);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addComponent = async (req, res) => {
    const { name, specification, quantity } = req.body;
    try {
        const newComponent = new Component({
            name,
            specification,
            quantity
        });
        const savedComponent = await newComponent.save();
        res.json(savedComponent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
