const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
chai.should();

const { userSchema } = require("../controllers/models/db");

chai.use(chaiHttp);



// Authorization API TESTING
describe("authorization", () => {
  describe("/post Registeruser", () => {
    it("it should register a user ", (done) => {
      const body = {
        name: "aditya101",
        email: "testemail@email.com",
        password: "123457890",
      };

      chai
        .request(server)
        .post("/auth/register")
        .send(body)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("user");
          res.body.should.have.property("message").a("string");
          done();
        });
    });

    it("Enter email to register ", (done) => {
      const body = {
        name: "aditya",
        email: "",
        password: "123457890",
      };

      chai
        .request(server)
        .post("/auth/register")
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");

          done();
        });
    });

    it("Email exist in the database ", (done) => {
      const body = {
        name: "aditya101",
        email: "testemail@email.com",
        password: "123457890",
      };

      chai
        .request(server)
        .post("/auth/register")
        .send(body)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/Post Login", () => {
    it("it should logged in a user", (done) => {
      const body = {
        email: "testemail@email.com",
        password: "123457890",
      };

      chai
        .request(server)
        .post("/auth/login")
        .send(body)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("token");

          done();
        });
    });

    it("Email does not exist in the database ", (done) => {
      const body = {
        email: "dummy@gmail.com",
        password: "1234578900",
      };

      chai
        .request(server)
        .post("/auth/register")
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          done();
        });
    });

    it("password is incorrect ", (done) => {
      const body = {
        email: "testemail@email.com",
        password: "12345890000",
      };

      chai
        .request(server)
        .post("/auth/register")
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/get Allusers", () => {
    it("it should get all the registered users", (done) => {
      chai
        .request(server)
        .get("/auth")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.greaterThan(0);
          done();
        });
    });
  });
});

after(async () => {
  await userSchema.destroy({
    where: { email: "testemail@email.com" },
    force: true,
  });
});
