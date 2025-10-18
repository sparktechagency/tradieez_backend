import express, { Request, Response } from 'express';
import morgan from "morgan";
import UserRoute from "../src/routes/UserRoute";


const app = express();

app.use(morgan("dev"))

app.get('/', (req:Request, res: Response) => {
  res.send('Tradiezz Backend is running...')
})

app.use("/api/v1/user", UserRoute)


export default app;