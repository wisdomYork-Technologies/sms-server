import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DbConnection = process.env.DB_CONNECTION_STRING!;
export const PORT = process.env.PORT!;

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// for hosted DB
export const db = new Sequelize(DbConnection, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: process.env.NODE_ENV === "development" && false,
    },
  },
});

// for local connection
// export const db = new Sequelize("postgres", "postgres", "password", {
//   host: "localhost",
//   port: 5433,
//   dialect: "postgres",
//   logging: false,
// });

export const connectDb = async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log("Connection has been established successfully to database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const accountSid = process.env.AccountSID;
export const authToken = process.env.AuthToken;
export const fromAdminPhone = process.env.fromAdminPhone;
export const APP_SECRET = process.env.APP_SECRET as string;
export const FromAdminMail = process.env.FromAdminMail as string;
export const userSubject = process.env.UserSubject as string;
export const GMAIL_PASS = process.env.GMAIL_USER as string;
export const GMAIL_USER = process.env.GMAIL_PASS as string;
export const Client_ID = process.env.Client_ID;
export const Client_Secret = process.env.Client_Secret;
export const CLIENT_URL = process.env.CLIENT_URL!;
export const SERVER_URL = process.env.SERVER_URL!;
