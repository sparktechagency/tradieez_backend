import express, { Application, Request, Response } from "express";
import cors from 'cors';
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import path from "path";
import bodyParser from "body-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import AuthRoute from "./routes/AuthRoute";
import ContactRoute from "./routes/ContactRoute";
import UserRoute from "./routes/UserRoute";
import CategoryRoute from "./routes/CategoryRoute";
import SubCategoryRoute from "./routes/SubCategoryRoute";
import FavoriteCandidateRoute from "./routes/FavoriteCandidateRoute";
import JobRoute from "./routes/JobRoute";
import FavoriteJobRoute from "./routes/FavoriteJobRoute";
import BlogCategoryRoute from "./routes/BlogCategoryRoute";
import BlogRoute from "./routes/BlogRoute";
import PolicyRoute from "./routes/PolicyRoute";
import ApplicationRoute from "./routes/ApplicationRoute";
import EmployerReviewRoute from "./routes/EmployerReviewRoute";
import CandidateReviewRoute from "./routes/CandidateReviewRoute";
import FaqRoute from "./routes/FaqRoute";
import AdminRoute from "./routes/AdminRoute";
import PlanRoute from "./routes/PlanRoute";
import SubscriptionRoute from "./routes/SubscriptionRoute";


const app: Application = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
      "http://16.16.183.92:5173",
      "http://16.16.183.92:4173",
      "http://16.16.183.92:3000",
      "https://tradiezz-dashboard.vercel.app",
      "https://tradiezz-website.vercel.app"
    ],
    credentials: true,
  }),
);


app.use(cookieParser())

app.use(morgan('dev'))

app.get('/', (req:Request, res:Response) => {
    res.send(`Tradiezz backend server is running......`);
});


//custom middleware implementation
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



//application routes
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/user', UserRoute);
app.use('/api/v1/contact', ContactRoute);
app.use('/api/v1/category', CategoryRoute);
app.use('/api/v1/blog-category', BlogCategoryRoute);
app.use('/api/v1/sub-category', SubCategoryRoute);
app.use('/api/v1/favorite-candidate', FavoriteCandidateRoute);
app.use('/api/v1/favorite-job', FavoriteJobRoute);
app.use('/api/v1/job', JobRoute);
app.use('/api/v1/blog', BlogRoute);
app.use('/api/v1/policy', PolicyRoute);
app.use('/api/v1/application', ApplicationRoute);
app.use('/api/v1/employer-review', EmployerReviewRoute);
app.use('/api/v1/candidate-review', CandidateReviewRoute);
app.use('/api/v1/faq', FaqRoute);
app.use('/api/v1/admin', AdminRoute);
app.use('/api/v1/plan', PlanRoute);
app.use('/api/v1/subscription', SubscriptionRoute);

//serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads",)))



// Global Error-handling middleware
app.use(globalErrorHandler);



//route not found
app.use(notFound)


export default app;