import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/AllExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const isDevelopment = configService.get('NODE_ENV') === 'development';
  console.log('isDevelopment', isDevelopment);

  if (isDevelopment) {
    const config = new DocumentBuilder()
      .setTitle('UNOCODE api docs')
      .setDescription('The UNOCODE API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [],
    });

    SwaggerModule.setup('api', app, document);
  }

  // 启用 CORS
  if (isDevelopment) {
    app.enableCors({
      origin: '*', // 允许所有域名访问，注意：生产环境下建议指定具体域名
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
  }

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}

bootstrap();
