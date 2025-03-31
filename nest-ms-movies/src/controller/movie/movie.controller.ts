import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { MovieService } from '../../services/movie/movie.service';
import { movies } from 'src/models/movies.model';

@Controller('movie')
export class MovieController {
    constructor(private movieService: MovieService) {}

    @Get()
    get() {
        return this.movieService
            .findall()
            .then((res) => {
                return { success: true, data: res };
            })
            .catch((error) => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    @Post()
    save(@Body() movie: movies) {
        return this.movieService
            .create(movie)
            .then((res) => {
                return { success: true, data: res };
            })
            .catch((error) => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    @Post('/update')
    update(@Body() movie: movies) {
        if (!movie.id) {
            throw new HttpException('El ID de la película es obligatorio', HttpStatus.BAD_REQUEST);
        }
        return this.movieService.update(movie)
            .then((res) => ({ success: true, data: res }))
            .catch((error) => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.movieService
            .delete(id)
            .then((res) => {
                return { success: true, data: res };
            })
            .catch((error) => {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }
}
