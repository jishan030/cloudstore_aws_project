require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const redis = require("./config/redis");

const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/api/health", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT 1 AS database_connection"
        );

        await redis.set("cloudstore:test", "Redis is working");
        const redisTest = await redis.get("cloudstore:test");

        res.json({
            status: "UP",
            service: "CloudStore Backend",
            database: "CONNECTED",
            redis: redisTest === "Redis is working"
                ? "CONNECTED"
                : "DISCONNECTED",
            result: rows[0]
        });

    } catch (error) {
        console.error("Health check error:", error.message);

        res.status(500).json({
            status: "DOWN",
            service: "CloudStore Backend",
            database: "DISCONNECTED",
            redis: "DISCONNECTED",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`CloudStore API running on port ${PORT}`);
});
