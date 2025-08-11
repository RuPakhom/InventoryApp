const supplierQuries = require("../db/suppliersQueries")
const { validationResult, body } = require("express-validator")

async function renderItemsBySupplier(req, res) {
    const supplierId = req.params.id
    const items = await supplierQuries.getItemsBySupplier(supplierId)
    console.log(items)
    if (items.length > 0) {
        res.render("items", {
            title: `Inventory App - ${items[0].supplier}`,
            items: items
    })
    }
    else {
        res.status(404).send("Supplier Not Found")
    }
}

function renderForm(req, res) {
    res.render("supplierform", {
        title: "Inventory App - New Supplier",
        body: {},
        action: "/supplier",
        errors: [],
        errorsMap: {}
    })
}

async function renderEditForm(req, res) {
    const { id } = req.params
    const rows = await supplierQuries.getSupplierById(id)
    const action = `/supplier/${id}/edit`

    res.render("supplierform", {
        title: "Inventory App - Update Supplier",
        body: rows[0],
        action,
        errors: [],
        errorsMap: {}
    })
}

const create_post = [
    body('name')
        .trim()
        .isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters long')
        .escape(),
    body('contact')
        .optional({ checkFalsy: true })
        .trim()
        .isEmail().withMessage("Contact field should be valid email")
        .escape(),
    
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorsMap = {}
            const errArray = errors.array();

            errArray.forEach(e => errorsMap[e.path] = e)
                        console.log(errorsMap)
            return res.status(400).render('supplierform', {
                    title: "Inventory App - New Supplier",
                    body: req.body,
                    action: "/supplier",
                    errors: errArray,
                    errorsMap
            })
        }
        try {
            const { name, contact } = req.body
            await supplierQuries.addSupplier(name, contact)
            res.redirect("/")
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
    body('contact')
        .optional({ checkFalsy: true })
        .trim()
        .isEmail().withMessage("Contact field should be valid email")
        .escape(),
    
        async (req, res) => {
            const errors = validationResult(req)
            const { id } = req.params
            const action = `/supplier/${id}/edit`

        if (!errors.isEmpty()) {
            const errorsMap = {}
            const errArray = errors.array();

            errArray.forEach(e => errorsMap[e.path] = e)
                        console.log(errorsMap)
            return res.status(400).render('supplierform', {
                    title: "Inventory App - Edit Supplier",
                    body: req.body,
                    action,
                    errors: errArray,
                    errorsMap
            })
        }
        try {
            const { name, contact } = req.body
            await supplierQuries.updateSupplier(id, name, contact)
            res.redirect("/")
        }
        catch (err) {
            console.log(err)
        }
    }
]

async function deleteSupplier(req, res) {
    const { id } = req.params
    res.render("delete", {
        title: "Delete Supplier",
        action: `/supplier/${id}/delete`
    })
}

async function deleteSupplierPost(req, res) {
    const { id } = req.params
    const password = req.body.password
    if (password === 'delete') {
        await supplierQuries.deleteSupplier(id)
        res.redirect("/")
    }
    else {
        res.send("Action has not been confirmed")
    }
}




module.exports = {
    renderItemsBySupplier,
    renderForm,
    renderEditForm,
    create_post,
    edit_post,
    deleteSupplier,
    deleteSupplierPost
}