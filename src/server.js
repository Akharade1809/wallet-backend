import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./config/middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import job from './config/cron.js';

dotenv.config();

const app = express()

if(process.env.NODE_ENV === "production") job.start();

const PORT = process.env.PORT || 5001;

//middleware
app.use(rateLimiter);
app.use(express.json());

app.use("/api/transactions", transactionsRoute);

app.get("/api/health", (req, res) => {
    res.status(200).json({status : "ok"});
});

initDB().then(()=> {
    app.listen(PORT, () => {
        console.log("Server is up on PORT", PORT);
    });

})