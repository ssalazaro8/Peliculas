import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { movies } from 'src/models/movies.model';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'mssql', // Tipo de base de datos
      host: 'tu host', // Nombre del servidor con la instancia
      port: 12345, // Puerto predeterminado
      username: 'usuario', // Nombre de usuario
      password: 'contraseña', // Contraseña
      database: 'tu_db', // Nombre de la base de datos
      entities: [],// // Aquí puedes agregar tus entidades
      synchronize: false,
      options: {
        encrypt: false, // Deshabilitar SSL
        trustServerCertificate: true, // Aceptar certificados no confiables
      },
    };
  }
}
