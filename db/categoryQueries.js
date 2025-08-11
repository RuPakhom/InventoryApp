const db = require("./pool")

async function getItemsByCategory(categoryId) {
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
        LEFT JOIN suppliers ON items.supplier_id = suppliers.id
        WHERE items.category_id = $1;
        `, [categoryId])
    
    return rows
}

async function addCategory(name, description) {
  await db.query(`
    INSERT INTO categories(name, description) VALUES ($1, $2);
    `, [name, description || null])
}

async function updateCategory(id, name, description) {
  await db.query(`
    UPDATE categories
    SET name = $1, description = $2
    WHERE id = $3;
    `, [name, description || null, id])
}

async function getCategoryById(id) {
  const { rows } = await db.query(`
    SELECT * FROM categories WHERE id = $1;`, [id])
  
  return rows;
}

async function deleteCategory(id) {
  await db.query(`
    DELETE FROM categories WHERE id = $1;
    `, [id])
}

module.exports = {
  getItemsByCategory,
  addCategory,
  updateCategory,
  getCategoryById,
  deleteCategory
}