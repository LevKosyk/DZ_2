const express = require('express');
const Product = require('../models/product');
const errorHandler = require('../utils/errorHandle');

module.exports.getAll = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        errorHandler(res, 500, error); 
    }
};

module.exports.getById = async (req, res) => {
    try {
        const product = await Product.findOne({ where: { id: req.params.id } });
        if (product) {
            res.status(200).json(product);
        } else {
            errorHandler(res, 404, 'Product not found');
        }
    } catch (error) {
        errorHandler(res, 500, error);
    }
};

module.exports.create = async (req, res) => {
    try {
        const product = await Product.create({
            Name: req.body.name, 
            Description: req.body.description,
            Price: req.body.price,
        });
        res.status(201).json(product);
    } catch (error) {
        errorHandler(res, 500, error);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const result = await Product.destroy({ where: { id: req.params.id } });
        if (result) {
            res.status(204).send(); 
        } else {
            errorHandler(res, 404,'Product not found');
        }
    } catch (error) {
        errorHandler(res, 500, error);
    }
};

module.exports.update = async (req, res) => {
    try {
        const [updated] = await Product.update(
            {
                Name: req.body.name,
                Description: req.body.description,
                Price: req.body.price,
            },
            {
                where: { id: req.params.id },
            }
        );
        if (updated) {
            const updatedProduct = await Product.findOne({ where: { id: req.params.id } });
            res.status(200).json(updatedProduct);
        } else {
            errorHandler(res, 404,'Product not found');
        }
    } catch (error) {
        errorHandler(res, 500, error);
    }
};
