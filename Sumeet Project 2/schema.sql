CREATE DATABASE Project-2_db;

CREATE TABLE stocks (
    index INT PRIMARY KEY,
    date DATE NOT NULL,
    ticker VARCHAR NOT NULL,
    company VARCHAR NOT NULL,
    open FLOAT NOT NULL,
    high FLOAT NOT NULL,
    low FLOAT NOT NULL,
    close FLOAT NOT NULL,
    adjclose FLOAT NOT NULL,
    stock FLOAT NOT NULL
);
	

