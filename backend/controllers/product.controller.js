const phone = require("../models/phone");
const { calculateEMI } = require("../services/emi.service");

const getProducts = async (req, res) => {
    try {
        const products = await phone.findAll();

        products.forEach(product => {
            product.variants.forEach(variant => {
                variant.emi_plans = product.emi_plans.map(plan => ({
                    tenure: plan.tenure,
                    interest_rate: plan.interest_rate,
                    cashback: plan.cashback,
                    monthly_emi: calculateEMI(
                        Number(variant.price),
                        Number(plan.interest_rate),
                        plan.tenure
                    )
                }));
            });
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await phone.findOneById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        product.variants.forEach(variant => {
            variant.emi_plans = product.emi_plans.map(plan => ({
                tenure: plan.tenure,
                interest_rate: plan.interest_rate,
                cashback: plan.cashback,
                monthly_emi: calculateEMI(
                    Number(variant.price),
                    Number(plan.interest_rate),
                    plan.tenure
                )
            }));
        });

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch product"
        });
    }
};

module.exports = {
    getProducts,
    getProductById
};