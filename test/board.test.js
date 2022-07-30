const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
chai.should();

const { boardSchema, userSchema } = require("../controllers/models/db");

chai.use(chaiHttp);




describe("BOARD" ,()=>{
    
describe("/post boards", () => {
    
    it("when user is logging in without authorization", (done) => {
        chai
        .request(server)
        .post("/boards")
        //    .set('Authorization' ,"Bearer " + testUser1.token)
        .send({
            title: "Its for testing",
        })
        .end((err, res) => {
            res.should.have.status(403);
        });
        done();
    });

});

describe("/put boards/:id", function () {
  this.timeout(5000);

  const boardID = 2;
  it("When not loggedin.", (done) => {
    chai
      .request(server)
      .put(`/boards/${boardID}`)
      .send({
        title: "updated title",
      })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});
});

