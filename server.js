import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 2000;
const api = "http://localhost:1000";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"))
 
// get the home page 
app.get("/", async(req, res) => {
    try {
        const re = await axios.get(api+"/posts");
        res.render("home.ejs", {poste: re.data});
    } catch (error) {
        res
            .status(500) 
            .json({error: "Failed to get the Blog Web."})
    }
})

// creat a new post
app.post("/newpost", async(req, res) => {
    try {
        const re = await axios.post(api+"/api/newpost", req.body);
        res.redirect("/");
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to creat post."})
    }
})

// edit a post
app.get("/edit/:id", async(req, res) => {
    try {
        const re = await axios.get(api+"/api/edit/"+req.params.id);
        const resu = re.data;
        res.render("edit.ejs", {
            pos: resu
        })
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to edit post."}) 
    }
})

app.post("/api/edit/:id", async(req, res) => {
    try {
        const re = await axios.patch(api+"/api/edit/"+req.params.id, req.body);
        res.redirect("/")
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to edit post."})
    }
})
 
// delete a post
app.get("/delete/:id", async(req, res) => {
    try {
        const re = await axios.delete(api+"/api/delete/"+req.params.id);
        res.redirect("/");
    } catch (error) {
        res
            .status(500)
            .json({error: "Failed to delete post."})
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}) 