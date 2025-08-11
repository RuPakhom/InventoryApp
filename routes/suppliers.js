const { Router } = require("express")
const controller = require("../controllers/supplierController")


const suppliersRouter = Router()

suppliersRouter.post("/", controller.create_post)
suppliersRouter.get("/new", controller.renderForm)
suppliersRouter.get("/:id", controller.renderItemsBySupplier)
suppliersRouter.get("/:id/edit", controller.renderEditForm)
suppliersRouter.post("/:id/edit", controller.edit_post)
suppliersRouter.get("/:id/delete", controller.deleteSupplier)
suppliersRouter.post("/:id/delete", controller.deleteSupplierPost)

module.exports = suppliersRouter