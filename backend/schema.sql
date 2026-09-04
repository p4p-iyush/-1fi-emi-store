CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    color VARCHAR(100),
    storage VARCHAR(50),
    mrp NUMERIC(10,2) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    image_url TEXT,

    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE TABLE emi_plans (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    tenure INTEGER NOT NULL,
    interest_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
    cashback NUMERIC(10,2) DEFAULT 0,

    CONSTRAINT fk_emi_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);
