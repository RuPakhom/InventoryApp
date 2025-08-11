const { Router } = require("express")
const controller = require("../controllers/indexController")

const indexRouter = Router()

indexRouter.get("/", controller.renderMainPage)

module.exports = indexRouter