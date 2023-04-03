import { NestFactory } from '@nestjs/core';
import { AppModule } from './settings/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      stopAtFirstError: true,
    }),
  );

  // OpenAPI config
  const config = new DocumentBuilder()
    .setTitle('Driver rider')
    .setDescription('The driverr rider API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.APP_PORT;
  await app.listen(port);
  Logger.log(
    `The microservice template nest js has started in port: ${port}`,
    'MainNestApplication',
  );
}
bootstrap();
