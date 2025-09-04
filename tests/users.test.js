import { prisma } from "../src/prisma.js";
import { app } from "../src/app.js";
import request from "supertest";

beforeAll(async () => {
  await prisma.contact.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Users API", () => {
  let userId;

  test("POST /api → create user", async () => {
    const res = await request(app).post("/api").send({
      name: "Peter",
      email: "peter@example.com",
    });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe("Peter");
    userId = res.body.id;
  });

  test("GET /api → list users", async () => {
    const res = await request(app).get("/api");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/:id → get user by id", async () => {
    const res = await request(app).get(`/api/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
    expect(res.body.email).toBe("peter@example.com");
  });

  test("PATCH /api/:id → update user", async () => {
    const res = await request(app).patch(`/api/${userId}`).send({
      name: "Peter Updated",
    });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Peter Updated");
  });

  test("DELETE /api/:id → delete user", async () => {
    const res = await request(app).delete(`/api/${userId}`);
    expect(res.status).toBe(204);
  });

  test("GET /api/:id → not found after delete", async () => {
    const res = await request(app).get(`/api/${userId}`);
    expect(res.status).toBe(404);
  });
});

//npm test --tests/users.test.js
