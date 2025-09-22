import "dotenv/config";

import { DataSource } from "typeorm";

process.on("beforeExit", () => {
	console.log("DB_PASS:", process.env.DB_PASS);
});

const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	port: Number(process.env.DB_PORT),
	entities: ["src/entities/*.ts"],
	migrations: ["src/migrations/*.ts"],
});

export default AppDataSource;
