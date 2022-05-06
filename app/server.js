module.exports = class Application {
  #express = require("express");
  #app = this.#express();
  constructor(PORT, DB_URL) {
    this.configAplications();
    this.creatServer(PORT);
    this.configDataBase(DB_URL);
    this.errorHandeling();
  }
  configAplications() {
    const path = require("path");
    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
  }
  creatServer(PORT) {
    this.#app.listen(PORT, () => console.log("Server is Running"));
  }
  configDataBase(DB_URL) {
    const { connect } = require("mongoose");
    connect(DB_URL, (err) => {
      if (err) throw err;
      return console.log("connect to database");
    });
  }
  errorHandeling() {
    this.#app.use((req, res, next) => {
      return res.json({
        status: 404,
        success: false,
        message: "صفحه ی مورد نظر پیدا نشد",
      });
    });
    this.#app.use((error, req, res, next) => {
      const status = error?.status || error?.code || 500;
      const success = error?.success || false;
      const message = error?.message || "خطای سرور";
      return res.status(status).json({
        status,
        success,
        message,
      });
    });
  }
  creatRouter(){
      this.#app.get("/" , (req,res)=>{
          return res.json({
              message:"Hello World"
          })
      })
  }
}
