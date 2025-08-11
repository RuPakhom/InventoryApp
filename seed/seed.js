const { Client } = require('pg')

const client = new Client({

})

const sql = `
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS suppliers;
DROP TABLE IF EXISTS items;

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact TEXT
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    quantity INTEGER DEFAULT 0,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    supplier_id INTEGER REFERENCES suppliers(id) ON DELETE SET NULL
);

INSERT INTO suppliers(name, contact) VALUES
('Fender', 'support@fender.com'),
('Yamaha', 'contact@yamaha.com'),
('Zildjian', 'info@zildjian.com'),
('Roland', 'service@roland.com'),
('Ernie Ball', 'sales@ernieball.com');

INSERT INTO categories (name, description) VALUES
('Guitars', 'Electric and acoustic guitars'),
('Keyboards', 'Digital pianos and synthesizers'),
('Drums', 'Drum kits and percussion'),
('Accessories', 'Strings, picks, bags, and more');

INSERT INTO items (name, description, price, quantity, category_id, supplier_id) VALUES
('Fender Stratocaster', 'Electric guitar with classic tone', 899.99, 5, 1, 1),
('Yamaha P-125', 'Digital piano with weighted keys', 749.50, 3, 2, 2),
('Zildjian Crash 16"', '16-inch crash cymbal', 229.00, 10, 3, 3),
('Ernie Ball Strings', 'Guitar string set - Regular Slinky', 9.99, 100, 4, 5),
('Roland SPD-SX', 'Sampling pad for live performance', 699.00, 2, 3, 4);
`
const main = async () => {
await client.connect()
const result = await client.query(sql)
console.log(result)

await client.end()
}

main()