const request = require("supertest");
const app = require("../src/app");
const booksData = require("../src/booksData");

function generateMockData() {
  return [
    {
      bestsellers_date: 1211587200000,
      published_date: 1212883200000,
      author: "Dean R Koontz",
      description:
        "Odd Thomas, who can communicate with the dead, confronts evil forces in a California coastal town.",
      price: 27,
      publisher: "Bantam",
      title: "ODD HOURS",
      rank: 1,
      rank_last_week: 0,
      weeks_on_list: 1,
      id: "5b4aa4ead3089013507db18b"
    },
    {
      bestsellers_date: 1211587200000,
      published_date: 1212883200000,
      author: "Stephenie Meyer",
      description:
        "Aliens have taken control of the minds and bodies of most humans, but one woman won’t surrender.",
      publisher: "Little, Brown",
      title: "THE HOST",
      rank: 2,
      rank_last_week: 1,
      weeks_on_list: 3,
      id: "5b4aa4ead3089013507db18c"
    },
    {
      bestsellers_date: 1211587200000,
      published_date: 1212883200000,
      author: "Emily Giffin",
      description:
        "A woman's happy marriage is shaken when she encounters an old boyfriend.",
      publisher: "St. Martin's",
      title: "LOVE THE ONE YOU'RE WITH",
      rank: 3,
      rank_last_week: 2,
      weeks_on_list: 2,
      id: "5b4aa4ead3089013507db18d"
    },
  ];
}

describe("GET /books", () => {
  beforeEach(() => {
    booksData.length = 0;
  });

  it("returns 200 and empty array when datastore empty", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: [] });
  });

  it("returns 200 and correct data when datastore not empty", async () => {
    const mockData = generateMockData();

    booksData.push(...mockData);
    
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: mockData });
  });

  it("returns one book when searching title 'odd'", async () => {
    // set up our datastore for the test
    const mockData = generateMockData();
    booksData.push(...mockData);

    // run the test itself (i.e. send the HTTP request)
    const response = await request(app).get("/books?search=odd");
    const expectedData = [ mockData[0] ];

    // make assertions
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toEqual(expectedData);
  });
});
