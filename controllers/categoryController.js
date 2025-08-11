const categoryQuries = require("../db/categoryQueries")
const { validationResult, body } = require("express-validator")



async function renderItemsByCategory(req, res) {
    const categoryId = req.params.id
    const items = await categoryQuries.getItemsByCategory(categoryId)
    console.log(items)
    if (items.length > 0) {
        res.render("items", {
            title: `Inventory App - ${items[0].category}`,
            items: items
    })
    }
    else {
        res.status(404).send("Category Not Found")
    }

}

function renderForm(req, res) {
    res.render("categoryform", {
        title: "Inventory App - New Category",
        body: {},
        action: "/category",
        errors: [],
        errorsMap: {}
    })
}

async function renderEditForm(req, res) {
    const { id } = req.params
    const rows = await categoryQuries.getCategoryById(id)
    const action = `/category/${id}/edit`

    console.log(rows)

    res.render("categoryform", {
        title: "Inventory App - Update Category",
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
    body('description')
        .optional({ checkFalse: true })
        .trim()
        .isLength({ max: 1000 }).withMessage('Description is too long')
        .escape(),
    
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const errorsMap = {}
            const errArray = errors.array();

            errArray.forEach(e => errorsMap[e.path] = e)
                        console.log(errorsMap)
            return res.status(400).render('categoryform', {
                    title: "Inventory App - New Category",
                    body: req.body,
                    action: "/category",
                    errors: errArray,
                    errorsMap
            })
        }
        try {
            const { name, description } = req.body
            await categoryQuries.addCategory(name, description)
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
    body('description')
        .optional({ checkFalse: true })
        .trim()
        .isLength({ max: 1000 }).withMessage('Description is too long')
        .escape(),
    
        async (req, res) => {
            const errors = validationResult(req)
            const { id } = req.params
            const action = `/category/${id}/edit`

        if (!errors.isEmpty()) {
            const errorsMap = {}
            const errArray = errors.array();

            errArray.forEach(e => errorsMap[e.path] = e)
                        console.log(errorsMap)
            return res.status(400).render('categoryform', {
                    title: "Inventory App - Edit Category",
                    body: req.body,
                    action,
                    errors: errArray,
                    errorsMap
            })
        }
        try {
            const { name, description } = req.body
            await categoryQuries.updateCategory(id, name, description)
            res.redirect("/")
        }
        catch (err) {
            console.log(err)
        }
    }
]

async function deleteCategory(req, res) {
    const { id } = req.params
    res.render("delete", {
        title: "Delete Category",
        action: `/category/${id}/delete`
    })
}

async function deleteCategoryPost(req, res) {
    const { id } = req.params
    const password = req.body.password
    if (password === 'delete') {
        await categoryQuries.deleteCategory(id)
        res.redirect("/")
    }
    else {
        res.send("Action has not been confirmed")
    }
}


module.exports = {
    renderItemsByCategory,
    renderForm,
    renderEditForm,
    create_post,
    edit_post,
    deleteCategory,
    deleteCategoryPost
}