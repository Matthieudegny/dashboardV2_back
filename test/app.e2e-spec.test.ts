import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({ message: 'Get all users' });
      });
  });

  it('/users/:id (GET)', () => {
    const userId = 1;
    return request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({ id: userId, name: 'John Doe' });
      });
  });

  it('/users (POST)', () => {
    const newUser = { name: 'Jane Doe' };
    return request(app.getHttpServer())
      .post('/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({ id: expect.any(Number), ...newUser });
      });
  });

  it('/users/:id (DELETE)', () => {
    const userId = 1;
    return request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({ message: `User with id ${userId} deleted` });
      });
  });

  it('/users/:id (PUT)', () => {
    const userId = 1;
    const updatedUser = { name: 'Updated User' };
    return request(app.getHttpServer())
      .put(`/users/${userId}`)
      .send(updatedUser)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual({ id: userId, ...updatedUser });
      });
  });
});
