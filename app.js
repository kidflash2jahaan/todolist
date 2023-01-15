const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()
const port = 80

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB")

const itemsSchema = new mongoose.Schema({
    name: String
})

const Item = mongoose.model("Item", itemsSchema)

const defaultItem = new Item({
    name: 'Welcome to your to do list!'
})

app.get("/", function (req, res) {
    Item.find({}, function (err, items) {
        if (items.length === 0) {
            Item.insertMany(defaultItem, function (err) {
                if (err) {
                    console.log(err)
                }
            })
            res.redirect("/")
        } else {
            res.render("list", { items: items })
        }
    })
})

app.post("/add", function (req, res) {
    const itemName = req.body.newItem
    const item = new Item({
        name: itemName
    })

    item.save()

    res.redirect("/")
})

app.post("/delete", function (req, res) {
    const itemId = req.body.checkbox
    Item.findByIdAndRemove(itemId, function (err) {
        if (err) {
            console.log(err)
        }
    })

    res.redirect("/")
})

app.listen(port, function () {
    console.log("Server started on port " + port)
})