const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./routers/users")
const employeeRouter = require("./routers/employees")

const app = express();
const SERVER_PORT = process.env.POST || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CONN_STRING = "mongodb+srv://nimaabady_2:9B8pXSQ9sJt1ZmX5@cluster0.q3vew1a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

app.use('/api/v1/user', userRouter)
app.use('/api/v1/emp', employeeRouter)

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});

