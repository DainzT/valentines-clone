import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import surveyRoutes from "../src/routers/surveyRoute"
import employeesRoute from "../src/routers/employeesRoute"
import employRoute from "./routers/employRoute"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/survey", surveyRoutes)

app.use("/api/ems", employeesRoute)

app.use("/api/employees", employRoute)

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
);