import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { movies } from 'src/models/movies.model';
import { Repository } from 'typeorm';

@Injectable()
export class MovieService {
    constructor(@InjectRepository(movies) private moviesRepository: Repository<movies>) {

    }

    async findall():Promise<movies[]>{
        return await this.moviesRepository.findBy({status: true});
    }

    async findById(id: number): Promise<movies> {
        return await this.moviesRepository.findOneBy({id: id, status: true});
    }

    async create(movie: movies): Promise<movies> {
        return await this.moviesRepository.save(movie);
    }

    update(movie: movies): Promise<any> {
        return this.moviesRepository.update(movie.id, movie); // Actualiza el registro con el ID
    }
      
    async delete(id: number): Promise<string> {
         await this.moviesRepository.delete(id);
         return `Pelicula eliminada con exito`;
    }
}
