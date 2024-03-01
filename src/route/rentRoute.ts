import express from "express"
import { createcar, deletecar, readcar, updatecar } from "../controller/carController"
import { createRent, deleteRent, readRent, updateRent } from "../controller/rentController"
const app = express()

app.use(express.json())

app.get(`/rent`, readRent)
app.post(`/rent`, createRent)
app.put(`/rent/:carID`,updateRent)
app.delete(`/rent/:carID`, deleteRent)



export default app