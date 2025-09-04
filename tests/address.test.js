import request from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/prisma.js";

beforeAll(async () => {
  // bersihkan semua data
  await prisma.address.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Addresses API", () => {
  let user, contact, address;

  test("Setup: create user", async () => {
    const res = await request(app)
      .post("/api")
      .send({ name: "User Addr", email: "useraddr@example.com" });
    expect(res.status).toBe(201);
    user = res.body;
  });

  test("Setup: create contact for user", async () => {
    const res = await request(app)
      .post(`/api/users/${user.id}/contacts`)
      .send({ phone: "+62811223344", label: "home" });
    expect(res.status).toBe(201);
    contact = res.body;
  });

  test("POST /api/contacts/:contactId/addresses → create address", async () => {
    const res = await request(app)
      .post(`/api/contacts/${contact.id}/addresses`)
      .send({
        line1: "Jl. Melati No. 5",
        city: "Jakarta",
        country: "ID",
        postalCode: "10110",
      });
    expect(res.status).toBe(201);
    address = res.body;
  });

  test("GET /api/contacts/:contactId/addresses → list addresses by contact", async () => {
    const res = await request(app).get(`/api/contacts/${contact.id}/addresses`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  test("GET /api/addresses/:id → get address by id", async () => {
    const res = await request(app).get(`/api/addresses/${address.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(address.id);
    expect(res.body.contactId).toBe(contact.id);
  });

  test("PATCH /api/addresses/:id → update address", async () => {
    const res = await request(app)
      .patch(`/api/addresses/${address.id}`)
      .send({ city: "Bandung", postalCode: "40111" });
    expect(res.status).toBe(200);
    expect(res.body.city).toBe("Bandung");
    expect(res.body.postalCode).toBe("40111");
  });

  test("DELETE /api/addresses/:id → delete address", async () => {
    const res = await request(app).delete(`/api/addresses/${address.id}`);
    expect(res.status).toBe(204);
  });

  test("GET /api/addresses/:id → not found after delete", async () => {
    const res = await request(app).get(`/api/addresses/${address.id}`);
    expect(res.status).toBe(404);
  });
});

//npm test --tests/address.test.js
