import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { GlobalFilter } from './filters/globalFilter';
import * as bodyParse from 'body-parser';
import { jsonParserMiddleware } from './middleware/jsonParser.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  // app.use(bodyParse.json({ limit: '1mb' }));
  // app.use(bodyParse.urlencoded({ extended: true }));

  app.use(jsonParserMiddleware);

  app.useGlobalFilters(new GlobalFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(3000);
}
bootstrap();
