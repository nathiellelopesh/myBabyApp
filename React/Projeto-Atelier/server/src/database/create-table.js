const {query} = require('./pool')

async function createTable() {
    await query(`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            description VARCHAR(200),
            price DECIMAL(10,2) NOT NULL,
            images TEXT[],
            size VARCHAR(50),
            is_promotion BOOLEAN DEFAULT FALSE,
            filter VARCHAR(100)[] NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `)
    process.exit()
}

createTable()