import express from "express"
import { createadmin, deleteadmin, readadmin, updateadmin, login } from "../controller/adminController"
import { verifyAdmin } from "../middleware/verifyAdmin"
const app = express()

app.use(express.json())

app.get(`/admin`, readadmin)
app.post(`/admin`, createadmin)
app.put(`/admin/:ID`, updateadmin)
app.delete(`/admin/:ID`, deleteadmin)
app.post(`/admin/login`, login)



export default app  