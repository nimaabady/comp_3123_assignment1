const express = require("express");
const mongoose = require("mongoose")
const userRouter = require("./routers/users")
const employeeRouter = require("./routers/employees")
const app = express();
const SERVER_PORT = process.env.POST || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

