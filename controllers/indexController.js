const indexQueriues = require("../db/indexQueries")

async function renderMainPage(req, res) {
    const categories = await indexQueriues.getAllCategories()
    const suppliers = await indexQueriues.getAllCSuppliers()
    res.render("index", {
        title: "Inventory App",
        categories: categories,
        suppliers:suppliers
    })
}

module.exports = {
    renderMainPage
}