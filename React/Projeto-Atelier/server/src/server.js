
const express = require("express")
const cors = require("cors");
const router = require("./router")

const app = express()

app.use(cors());

app.use(express.json());

app.use("/atelier", router);

const PORT = 3000
app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}/`));

