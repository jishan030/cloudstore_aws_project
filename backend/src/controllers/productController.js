const pool = require("../config/db");
const redis = require("../config/redis");

const getProducts = async (req, res) => {
    try {
        const cacheKey = "cloudstore:products";

        const cachedProducts = await redis.get(cacheKey);

        if (cachedProducts) {
            console.log("Products served from Redis cache");

            const products = JSON.parse(cachedProducts);

            return res.json({
                success: true,
                source: "redis",
                count: products.length,
                products
            });
        }

        console.log("Products fetched from MySQL");

        const [products] = await pool.query(`
            SELECT
                p.id,
                p.name,
                p.slug,
                p.description,
                p.price,
                p.stock,
                p.image_url,
                p.rating,
                c.name AS category
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE p.is_active = TRUE
            ORDER BY p.created_at DESC
        `);

        await redis.set(
            cacheKey,
            JSON.stringify(products),
            "EX",
            60
        );

        res.json({
            success: true,
            source: "mysql",
            count: products.length,
            products
        });

    } catch (error) {
        console.error("Get products error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
    }
};

module.exports = {
    getProducts
};
