import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

import { User } from '../src/entities/User';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(0);
        expect(
          res.body.every((user: User) => typeof user.idUser === 'number'),
        ).toBe(true);
        expect(
          res.body.every((user: User) => typeof user.firstName === 'string'),
        ).toBe(true);
        expect(
          res.body.every((user: User) => typeof user.lastName === 'string'),
        ).toBe(true);
        expect(
          res.body.every((user: User) => typeof user.login === 'string'),
        ).toBe(true);
        expect(
          res.body.every((user: User) => typeof user.password === 'string'),
        ).toBe(true);
      });
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(0);
      });
  });

  it('/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ name: 'Test User', email: 'test@example.com' })
      .expect(201)
      .expect('Content-Type', /json/);
  });

  it('/user/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/user/1')
      .send({ name: 'Updated User', email: 'updated@example.com' })
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/user/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/user/1')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});
