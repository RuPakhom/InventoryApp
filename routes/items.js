const { Router } = require("express")
const controller = require("../controllers/itemController")
const { deleteItem } = require("../db/itemQueries")

const itemsRouter = Router()

itemsRouter.get("/all", controller.renderAllItems)
itemsRouter.post("/", controller.create_post)
itemsRouter.get("/new", controller.renderForm)
itemsRouter.get("/:id/edit", controller.renderEditForm)
itemsRouter.post("/:id/edit", controller.edit_post)
itemsRouter.get("/:id/delete", controller.deleteItem)
itemsRouter.post("/:id/delete", controller.deleteItemPost)

module.exports = itemsRouter
