const db = require("./pool")

async function getAllCategories(){
    
    const { rows } = await db.query(`
        SELECT categories.id, categories.name, categories.description, COUNT(items.id) AS item_count
        FROM categories
        LEFT JOIN items ON items.category_id = categories.id
        GROUP BY categories.id, categories.name, categories.description
        ORDER BY categories.id;
        `)
    
    return rows
}

async function getAllCSuppliers(){
    
    const { rows } = await db.query(`
        SELECT suppliers.id, suppliers.name, suppliers.contact, COUNT(items.id) AS item_count
        FROM suppliers
        LEFT JOIN items ON items.supplier_id = suppliers.id
        GROUP BY suppliers.id, suppliers.name
        ORDER BY suppliers.id;
        `)
    
    return rows
}

module.exports = {
    getAllCategories,
    getAllCSuppliers
}