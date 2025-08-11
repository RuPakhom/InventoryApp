const express = require('express');
require("dotenv").config()
const app = express()

app.use(express.static("public"))

const indexRouter = require("./routes/index")
const catergoriesRouter = require("./routes/categories")
const itemsRouter = require("./routes/items")
const suppliersRouter = require("./routes/suppliers")

app.set("view engine", "ejs")

app.use(express.urlencoded({extended:true}))

app.use("/", indexRouter)
app.use("/category", catergoriesRouter)
app.use("/item", itemsRouter)
app.use("/supplier", suppliersRouter)


const PORT = 3000
app.listen(PORT, () => console.log(`Server runs on ${PORT}`))