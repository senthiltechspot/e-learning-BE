import v1Route from "./v1/index.js";

const Route = (app) => {
  app.use("/api/v1", v1Route);

  app.use("*", (req, res) => {
    res.status(404).json({
      status: "fail",
      message: "404 Error! Page Not Found!",
    });
  });
};

export default Route;
