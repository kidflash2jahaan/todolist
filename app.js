const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = 80

let items = []

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", function (req, res) {
    let date = new Date()
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = date.toLocaleDateString("en-US", options)

    res.render("list", { day: day, items: items })
})

app.post("/", function (req, res) {
    let item = req.body.newItem
    items.push(item)

    res.redirect("/")
})

app.listen(port, function () {
    console.log("Server started on port " + port)
})