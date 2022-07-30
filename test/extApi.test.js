const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
chai.should();

chai.use(chaiHttp);

describe("External Api", () => {
  describe("/get Articles", () => {
    it("it should pass when article already exixt", (done) => {
      chai
        .request(server)
        .get("/api/")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/get Articles", () => {
    const num = 10;
    it("it should show artilces", (done) => {
      chai
        .request(server)
        .get("/api/article/" + num)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
});
