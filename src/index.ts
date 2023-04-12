import express, { Request, Response, Application } from "express";
import { connectDb, PORT } from "./config/DbConfig";
import expressConfig from "./express-app";

(async function () {
  try {
    const app: Application = express();
    app.get("/", (req: Request, res: Response) => {
      return res.status(200).json({
        message: "api is running",
      });
    });
    await expressConfig(app);
    await connectDb();
    app
      .listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      })
      .on("error", (err) => {
        console.log(err);
        process.exit(1);
      });
  } catch (error) {
    console.log(error);
  }
})();
