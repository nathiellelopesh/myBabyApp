//
//models/product.js
const {query} = require("../database/pool")

async function getAllProducts() {
    const result = await query(`SELECT * FROM products;`);

    return result.rows
}

async function postNewProduct(title, description, price, images, size, filter) {
    try {
        await query(`
            INSERT INTO products
            (title, description, price, images, size, filter)
            VALUES ($1, $2, $3, $4, $5, $6);`,
            [title, description, price, images, size, filter]
        )
        console.log("Produto criado: ", title)
    } catch (error) {
        throw new Error("Não foi possível criar novo produto")
    }
}

async function getProductById(productId) {
    const result = await query(`SELECT * FROM products WHERE id = $1;`, [productId]);
    return result.rows[0];
}


async function updateProduct(productId, title, description , price, images, size, promotion, filter) {
    try {
        const updated = new Date();

        const product = await query(`
            UPDATE products SET
            title = $2, 
            description = $3, 
            price = $4, 
            images = $5, 
            size = $6, 
            is_promotion = $7,
            filter = $8, 
            updated_at = $9 
            WHERE id = $1;`,
            [productId, title, description , price, images, size, promotion, filter, updated]
        )
        
    } catch (error) {
        throw new Error("Não foi possível atualizar produto ", title)
    }
    
}

async function deleteProduct(productId) {
    try {
        await query(`DELETE FROM products WHERE id=$1;`, [productId])
        console.log("Produto excluido com sucesso!")
    } catch (error) {
        throw new Error("Não foi possível excluir produto de id ", productId)
    }
}

module.exports = {getAllProducts, postNewProduct, getProductById, updateProduct, deleteProduct}
