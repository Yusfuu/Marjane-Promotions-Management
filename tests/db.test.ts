import { prisma } from "../src/lib/prisma";
import request from 'supertest';
import { app } from '../build/app';

afterAll(async () => {
  await prisma.$disconnect();
});


const admin = {
  email: "admin@test.com",
  password: "BaFq_9t7WVNw0aK"
}


test('admin should be logged in', async () => {
  const response = await request(app).post('/api/admin/login').send(admin)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
});

test('a subadmin is added or a subadmin with the same email is rejected', async () => {
  const subadmin = await prisma.subadmin.create({
    data: {
      email: "test@gmail.com",
      name: "subadmin name",
      center: {
        connect: {
          id: '0906f855-d821-481c-985b-9e6739fdeec5'
        }
      }
    }
  }).catch(e => e);
  const code = subadmin?.code || null;
  if (code) {
    expect(code).toEqual('P2002');
  } else {
    expect(subadmin).not.toBeFalsy();
  }
});