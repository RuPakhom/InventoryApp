const db = require("./pool")

async function getAllItems() {
        const { rows } = await db.query(`
        SELECT items.id, 
          items.name,
          items.description,
          items.price,
          items.quantity,
          categories.name AS category,
          items.category_id,
          suppliers.name AS supplier,
          items.supplier_id
        FROM items
        LEFT JOIN categories ON items.category_id = categories.id
        LEFT JOIN suppliers ON items.supplier_id = suppliers.id;
        `)
    
    return rows
}

async function getAllCategories() {
  const { rows } = await db.query(`
    SELECT * FROM categories;`)
  
  return rows
}

async function getAllSuppliers() {
  const { rows } = await db.query(`
    SELECT * FROM suppliers;`)
  
  return rows
}

async function addItem(name, description, price, quantity, category_id, supplier_id) {
  await db.query(`
    INSERT INTO items(name, description, price, quantity, category_id, supplier_id) VALUES ($1, $2, $3, $4, $5, $6);
    `, [name, description || null, price || 0, quantity || 0, category_id, supplier_id])
}

async function updateItem(id, name, description, price, quantity, category_id, supplier_id) {
  await db.query(`
    UPDATE items
    SET name = $1, description = $2, price = $3, quantity = $4, category_id = $5, supplier_id = $6
    WHERE id = $7;
    `, [name, description || null, price || 0, quantity || 0, category_id, supplier_id, id])
}

async function getItemById(id) {
  const { rows } = await db.query(`
    SELECT * FROM items WHERE id = $1;`, [id])
  
  return rows;
}

async function deleteItem(id) {
  await db.query(`
    DELETE FROM items WHERE id = $1;
    `, [id])
}


module.exports = {
  getAllItems,
  getAllCategories,
  getAllSuppliers,
  addItem,
  updateItem,
  getItemById,
  deleteItem
}