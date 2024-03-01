import express from "express"
import { createcar, deletecar, readcar, updatecar } from "../controller/carController"
const app = express()

app.use(express.json())

app.get(`/car`, readcar)
app.post(`/car`, createcar)
app.put(`/car/:carID`,updatecar)
app.delete(`/car/:carID`, deletecar)



export default app