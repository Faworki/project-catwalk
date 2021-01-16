const app = require("./server.js");
const request = require("supertest")(app);

describe("Server", () => {
  it('should return index.html from "/" endpoint', async (done) => {
    let response = await request.get("/index.html");
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toEqual(
      expect.stringMatching(/text\/html/g)
    );
    expect(response.text).toEqual(
      expect.stringMatching(/<script src="app\.js"><\/script>/g)
    );
    done();
  });

  it('requests to "/api/fec2/hrnyc/" should return data from Atlier API', async (done) => {
    let response = await request.get("/api/fec2/hrnyc/products");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
    expect(response.body[0].campus).toEqual(expect.stringMatching('hrnyc'));
    expect(response.body[0].hasOwnProperty('id')).toBe(true);
    done();
  });
});
