const { Router } = require("express")
const controller = require("../controllers/categoryController")

const categoriesRouter = Router()

categoriesRouter.post("/", controller.create_post)
categoriesRouter.get("/new", controller.renderForm)
categoriesRouter.get("/:id", controller.renderItemsByCategory)
categoriesRouter.get("/:id/edit", controller.renderEditForm)
categoriesRouter.post("/:id/edit", controller.edit_post)
categoriesRouter.get("/:id/delete", controller.deleteCategory)
categoriesRouter.post("/:id/delete", controller.deleteCategoryPost)


module.exports = categoriesRouter
