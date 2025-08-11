const itemQuries = require("../db/itemQueries")
const { validationResult, body } = require("express-validator")

async function renderAllItems(req, res) {

    const items = await itemQuries.getAllItems()
    res.render("items", {
        title: "Intentory App - All Items",
        items: items
    })
    
}

async function renderForm(req, res) {

    const categories = await itemQuries.getAllCategories()
    const suppliers = await itemQuries.getAllSuppliers()
    
    res.render("itemform", {
        title: "Inventory App - New Item",
        body: {},
        action: "/item",
        categories,
        suppliers,
        errors: [],
        errorsMap: {}
    })
}

async function renderEditForm(req, res) {
    const { id } = req.params
    const rows = await itemQuries.getItemById(id)
    const action = `/item/${id}/edit`
    const categories = await itemQuries.getAllCategories()
    const suppliers = await itemQuries.getAllSuppliers()

    res.render("itemform", {
        title: "Inventory App - Update Supplier",
        body: rows[0],
        action,
        categories,
        suppliers,
        errors: [],
        errorsMap: {}
    })
}

const create_post = [
    body('name')
        .trim()
        .isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters long')
        .escape(),
    body('description')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 1000 }).withMessage("Description is too long")
        .escape(),
    body('price')
        .optional({ checkFalsy: true })
        .trim()
        .isFloat({ min: 0 }).withMessage("Price can't be below than zero")
        .escape(),
    body('quantity')
        .optional({ checkFalsy: true })
        .trim()
        .isInt({ min: 1 }).withMessage("You should have at least 1 quantity")
        .escape(),
    
    async (req, res) => {
        const categories = await itemQuries.getAllCategories()
        const suppliers = await itemQuries.getAllSuppliers()
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorsMap = {}
            const errArray = errors.array();

            errArray.forEach(e => errorsMap[e.path] = e)
                        console.log(errorsMap)
            return res.status(400).render('itemform', {
                    title: "Inventory App - New Item",
                    body: req.body,
                    action: "/item",
                    categories,
                    suppliers,
                    errors: errArray,
                    errorsMap
            })
        }
        try {
            const { name, description, price, quantity, category, supplier } = req.body
            await itemQuries.addItem(name, description, price, quantity, category, supplier)
            res.redirect("/item/all")
        }
        catch (err) {
            console.log(err)
        }
    }
]

const edit_post = [
    body('name')
        .trim()
        .isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters long')
        .escape(),
    body('description')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 1000 }).withMessage("Description is too long")
        .escape(),
    body('price')
        .optional({ checkFalsy: true })
        .trim()
        .isFloat({ min: 0 }).withMessage("Price can't be below than zero")
        .escape(),
    body('quantity')
        .optional({ checkFalsy: true })
        .trim()
        .isInt({ min: 1 }).withMessage("You should have at least 1 quantity")
        .escape(),
    
        async (req, res) => {
            const errors = validationResult(req)
            const { id } = req.params
            const action = `/item/${id}/edit`

            const categories = await itemQuries.getAllCategories()
            const suppliers = await itemQuries.getAllSuppliers()

        if (!errors.isEmpty()) {
            const errorsMap = {}
            const errArray = errors.array();

            errArray.forEach(e => errorsMap[e.path] = e)
                        console.log(errorsMap)
            return res.status(400).render('itemform', {
                    title: "Inventory App - Edit Item",
                    body: req.body,
                    action,
                    categories,
                    suppliers,
                    errors: errArray,
                    errorsMap
            })
        }
        try {
            const { name, description, price, quantity, category, supplier } = req.body
            await itemQuries.updateItem(id, name, description, price, quantity, category, supplier)
            res.redirect("/item/all")
        }
        catch (err) {
            console.log(err)
        }
    }
]

async function deleteItem(req, res) {
    const { id } = req.params
    res.render("delete", {
        title: "Delete Item",
        action: `/item/${id}/delete`
    })
}

async function deleteItemPost(req, res) {
    const { id } = req.params
    const password = req.body.password
    if (password === 'delete') {
        await itemQuries.deleteItem(id)
        res.redirect("/")
    }
    else {
        res.send("Action has not been confirmed")
    }
}

module.exports = {
    renderAllItems,
    renderForm,
    renderEditForm,
    create_post,
    edit_post,
    deleteItem,
    deleteItemPost
}