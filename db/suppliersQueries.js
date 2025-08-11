const db = require("./pool")

async function getItemsBySupplier(supplierId) {
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
        WHERE items.supplier_id = $1;
        `, [supplierId])
    
    return rows
}

async function addSupplier(name, contact) {
  await db.query(`
    INSERT INTO suppliers(name, contact) VALUES ($1, $2);
    `, [name, contact || null])
}

async function updateSupplier(id, name, contact) {
  await db.query(`
    UPDATE suppliers
    SET name = $1, contact = $2
    WHERE id = $3;
    `, [name, contact || null, id])
}

async function getSupplierById(id) {
  const { rows } = await db.query(`
    SELECT * FROM suppliers WHERE id = $1;`, [id])
  
  return rows;
}

async function deleteSupplier(id) {
  await db.query(`
    DELETE FROM suppliers WHERE id = $1;
    `, [id])
}

module.exports = {
  getItemsBySupplier,
  addSupplier,
  updateSupplier,
  getSupplierById,
  deleteSupplier
}