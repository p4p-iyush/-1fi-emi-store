const pool = require("../config/db");

const seed = async () => {
    try {
        // Products
        const products = await pool.query(`
            INSERT INTO products (name, slug, description)
            VALUES
            (
                'Apple iPhone 17 Pro',
                'iphone-17-pro',
                'Latest Apple iPhone Pro smartphone with A18 Bionic chip and advanced camera system'
            ),
            (
                'Samsung Galaxy S24 Ultra',
                'samsung-s24-ultra',
                'Samsung flagship smartphone with AI features and S Pen'
            ),
            (
                'Google Pixel 9 Pro',
                'google-pixel-9-pro',
                'Google flagship smartphone with advanced AI and camera capabilities'
            ),
            (
                'OnePlus 13',
                'oneplus-13',
                'OnePlus flagship with Snapdragon 8 Gen 3 and Hasselblad camera system'
            ),
            (
                'Xiaomi 14 Pro',
                'xiaomi-14-pro',
                'Xiaomi flagship with Leica optics and Snapdragon 8 Gen 3'
            ),
            (
                'Sony Xperia 1 VI',
                'sony-xperia-1-vi',
                'Sony flagship with 4K OLED display and professional camera features'
            ),
            (
                'Nothing Phone (2)',
                'nothing-phone-2',
                'Nothing Phone with Glyph interface and unique transparent design'
            ),
            (
                'Motorola Edge 50 Ultra',
                'motorola-edge-50-ultra',
                'Motorola flagship with 125W fast charging and premium camera'
            ),
            (
                'Asus ROG Phone 8 Pro',
                'asus-rog-phone-8-pro',
                'Gaming smartphone with Snapdragon 8 Gen 3 and 165Hz display'
            )
            RETURNING id, name;
        `);

        const productIds = products.rows;

        // Variants with realistic image URLs
        await pool.query(`
    INSERT INTO variants
    (product_id, color, storage, mrp, price, image_url)
    VALUES
    -- Apple iPhone 17 Pro
    ($1, 'Silver', '256GB', 134900, 129900,
        'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-17-pro-1.jpg'),
    ($1, 'Cosmic Orange', '512GB', 154900, 149900,
        'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-17-pro-2.jpg'),
    ($1, 'Deep Blue', '1TB', 174900, 169900,
        'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-17-pro-3.jpg'),

    -- Samsung Galaxy S24 Ultra
    ($2, 'Titanium Black', '256GB', 129999, 119999,
        'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-1.jpg'),
    ($2, 'Titanium Gray', '512GB', 149999, 139999,
        'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-2.jpg'),
    ($2, 'Titanium Violet', '512GB', 149999, 139999,
        'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-3.jpg'),
    ($2, 'Titanium Yellow', '1TB', 169999, 159999,
        'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-4.jpg'),

    -- Google Pixel 9 Pro
    ($3, 'Obsidian', '128GB', 109999, 99999,
        'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-1.jpg'),
    ($3, 'Porcelain', '256GB', 119999, 109999,
        'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-2.jpg'),
    ($3, 'Hazel', '512GB', 139999, 129999,
        'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-3.jpg'),
    ($3, 'Rose Quartz', '512GB', 139999, 129999,
        'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-4.jpg'),

    -- OnePlus 13
    ($4, 'Black Obsidian', '256GB', 89999, 84999,
        'https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-13-1.jpg'),
    ($4, 'Arctic Dawn', '512GB', 99999, 94999,
        'https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-13-2.jpg'),
    ($4, 'Emerald Forest', '512GB', 99999, 94999,
        'https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-13-3.jpg'),

    -- Xiaomi 14 Pro
    ($5, 'Black', '256GB', 79999, 74999,
        'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-pro-1.jpg'),
    ($5, 'White', '512GB', 89999, 84999,
        'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-pro-2.jpg'),
    ($5, 'Titanium', '1TB', 99999, 94999,
        'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-pro-3.jpg'),

    -- Sony Xperia 1 VI
    ($6, 'Black', '256GB', 139999, 129999,
        'https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-vi-1.jpg'),
    ($6, 'Silver', '512GB', 159999, 149999,
        'https://fdn2.gsmarena.com/vv/pics/sony/sony-xperia-1-vi-2.jpg'),

    -- Nothing Phone (2)
    ($7, 'Dark Grey', '128GB', 44999, 39999,
        'https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2-1.jpg'),
    ($7, 'White', '256GB', 49999, 44999,
        'https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2-2.jpg'),
    ($7, 'Dark Grey', '512GB', 54999, 49999,
        'https://fdn2.gsmarena.com/vv/pics/nothing/nothing-phone-2-1.jpg'),

    -- Motorola Edge 50 Ultra
    ($8, 'Black', '256GB', 59999, 54999,
        'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-50-ultra-1.jpg'),
    ($8, 'White', '512GB', 69999, 64999,
        'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-50-ultra-2.jpg'),
    ($8, 'Blue', '512GB', 69999, 64999,
        'https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-50-ultra-3.jpg'),

    -- Asus ROG Phone 8 Pro
    ($9, 'Black', '256GB', 89999, 84999,
        'https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-8-pro-1.jpg'),
    ($9, 'White', '512GB', 99999, 94999,
        'https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-8-pro-2.jpg'),
    ($9, 'Black', '1TB', 109999, 104999,
        'https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-8-pro-1.jpg')
`, productIds.map(p => p.id));

        // EMI Plans
        await pool.query(`
            INSERT INTO emi_plans
            (product_id, tenure, interest_rate, cashback)
            VALUES
            -- iPhone 17 Pro
            ($1, 3, 0, 2000), ($1, 6, 0, 1500), ($1, 9, 10.5, 1000),
            ($1, 12, 10.5, 500), ($1, 18, 10.5, 0), ($1, 24, 12.5, 0),
            
            -- Samsung S24 Ultra
            ($2, 3, 0, 2000), ($2, 6, 0, 1500), ($2, 9, 10.5, 1000),
            ($2, 12, 10.5, 500), ($2, 18, 10.5, 0), ($2, 24, 12.5, 0),
            
            -- Google Pixel 9 Pro
            ($3, 3, 0, 1500), ($3, 6, 0, 1000), ($3, 9, 10.5, 500),
            ($3, 12, 10.5, 500), ($3, 18, 10.5, 0), ($3, 24, 12.5, 0),
            
            -- OnePlus 13
            ($4, 3, 0, 1500), ($4, 6, 0, 1000), ($4, 9, 10.5, 500),
            ($4, 12, 10.5, 500), ($4, 18, 10.5, 0), ($4, 24, 12.5, 0),
            
            -- Xiaomi 14 Pro
            ($5, 3, 0, 1000), ($5, 6, 0, 500), ($5, 9, 10.5, 500),
            ($5, 12, 10.5, 0), ($5, 18, 10.5, 0), ($5, 24, 12.5, 0),
            
            -- Sony Xperia 1 VI
            ($6, 3, 0, 2000), ($6, 6, 0, 1500), ($6, 9, 10.5, 1000),
            ($6, 12, 10.5, 500), ($6, 18, 10.5, 0), ($6, 24, 12.5, 0),
            
            -- Nothing Phone (2)
            ($7, 3, 0, 1000), ($7, 6, 0, 500), ($7, 9, 10.5, 0),
            ($7, 12, 10.5, 0), ($7, 18, 10.5, 0), ($7, 24, 12.5, 0),
            
            -- Motorola Edge 50 Ultra
            ($8, 3, 0, 1000), ($8, 6, 0, 500), ($8, 9, 10.5, 0),
            ($8, 12, 10.5, 0), ($8, 18, 10.5, 0), ($8, 24, 12.5, 0),
            
            -- Asus ROG Phone 8 Pro
            ($9, 3, 0, 1500), ($9, 6, 0, 1000), ($9, 9, 10.5, 500),
            ($9, 12, 10.5, 0), ($9, 18, 10.5, 0), ($9, 24, 12.5, 0)
        `, productIds.map(p => p.id));

        console.log("✅ Seed data inserted successfully!");
        console.log(`📦 Inserted ${productIds.length} products with their variants and EMI plans`);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        await pool.end();
    }
};

seed();