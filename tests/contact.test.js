import request from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/prisma.js";

beforeAll(async () => {
  // bersihkan data
  await prisma.address.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Contacts API", () => {
  let user, contact;

  test("Setup: create user first", async () => {
    const res = await request(app)
      .post("/api")
      .send({ name: "User One", email: "user1@example.com" });
    expect(res.status).toBe(201);
    user = res.body;
  });

  test("POST /api/users/:userId/contacts → create contact", async () => {
    const res = await request(app)
      .post(`/api/users/${user.id}/contacts`)
      .send({ phone: "+628123456789", label: "mobile" });
    expect(res.status).toBe(201);
    expect(res.body.userId).toBe(user.id);
    contact = res.body;
  });

  test("GET /api/users/:userId/contacts → list contacts", async () => {
    const res = await request(app).get(`/api/users/${user.id}/contacts`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/contacts/:id → get contact by id", async () => {
    const res = await request(app).get(`/api/contacts/${contact.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(contact.id);
    expect(res.body.userId).toBe(user.id);
  });

  test("PATCH /api/contacts/:id → update contact", async () => {
    const res = await request(app)
      .patch(`/api/contacts/${contact.id}`)
      .send({ label: "office" });
    expect(res.status).toBe(200);
    expect(res.body.label).toBe("office");
  });

  test("DELETE /api/contacts/:id → delete contact", async () => {
    const res = await request(app).delete(`/api/contacts/${contact.id}`);
    expect(res.status).toBe(204);
  });

  test("GET /api/contacts/:id → not found after delete", async () => {
    const res = await request(app).get(`/api/contacts/${contact.id}`);
    expect(res.status).toBe(404);
  });
});


//npm test --tests/contact.test.js