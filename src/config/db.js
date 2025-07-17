import {neon} from "@neondatabase/serverless"
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DATABASE_URL);

export const sql = neon('postgresql://neondb_owner:npg_6vQSKyNO1xdE@ep-hidden-cloud-a1fghqtc-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

export async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title  VARCHAR(255) NOT NULL,
            amount  DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
          )`;
          console.log("Database initialized successfully");
    } catch (error){
        console.log("Error initializing DB", error);
        process.exit(1); // status code 1 means failure, 0 success

    }
    
}