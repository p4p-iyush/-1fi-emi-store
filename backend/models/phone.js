const pool = require("../config/db");

const findAll = async () => {
    const result = await pool.query(`
        SELECT
            p.id,
            p.name,
            p.slug,
            p.description,
            COALESCE(
                (
                    SELECT json_agg(v)
                    FROM variants v
                    WHERE v.product_id = p.id
                ),
                '[]'::json
            ) AS variants,
            COALESCE(
                (
                    SELECT json_agg(e)
                    FROM emi_plans e
                    WHERE e.product_id = p.id
                ),
                '[]'::json
            ) AS emi_plans
        FROM products p
        ORDER BY p.id;
    `);

    return result.rows;
};

const findOneById = async (id) => {
    const result = await pool.query(`
        SELECT
            p.id,
            p.name,
            p.slug,
            p.description,
            COALESCE(
                (
                    SELECT json_agg(v)
                    FROM variants v
                    WHERE v.product_id = p.id
                ),
                '[]'::json
            ) AS variants,
            COALESCE(
                (
                    SELECT json_agg(e)
                    FROM emi_plans e
                    WHERE e.product_id = p.id
                ),
                '[]'::json
            ) AS emi_plans
        FROM products p
        WHERE p.id = $1;
    `, [id]);

    return result.rows[0];
};

module.exports = {
    findAll,
    findOneById
};