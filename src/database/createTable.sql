CREATE TABLE IF NOT EXISTS employee(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(127),
    birth_date DATE,
    sex VARCHAR(6)
);