import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as express from 'express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const config = new DocumentBuilder()
    .setTitle('My dashboard API')
    .setDescription('API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'Input your JWT token',
        name: 'Authorization',
        bearerFormat: 'JWT',
        scheme: 'Bearer',
        type: 'http',
        in: 'header',
      },
      'bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      security: [{ bearer: [] }],
    },
  });

  // app.enableCors({
  //   origin: 'http://localhost:5173',
  // });
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow credentials (if needed)
  });

  await app.listen(8080);
}
bootstrap();
