import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormService } from './services/typeorm/typeorm.service';
import { MovieService } from './services/movie/movie.service';
import { MovieController } from './controller/movie/movie.controller';
import { movies } from './models/movies.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Cargar variables de entorno globalmente
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Asegurar que ConfigModule esté disponible en TypeormService
      useClass: TypeormService,
    }),
    TypeOrmModule.forFeature([movies]),
  ],
  controllers: [AppController, MovieController],
  providers: [AppService, TypeormService, MovieService],
})
export class AppModule {}
