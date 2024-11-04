const {getAllProducts, postNewProduct, getProductById, updateProduct, deleteProduct} = require ("../models/product");

const productsController = {
    index: async (req, res) => {
        try {
            const Products = await getAllProducts();
            res.json(Products);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar produtos." });
        }
    },
    show: async (req,res) => {
        const { id } = req.params;
        try {
            const product = await getProductById(id);
            if (!product) {
                return res.status(404).json({ error: "Produto não encontrado." });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar produto." });
        }
    }
}

module.exports = productsController

