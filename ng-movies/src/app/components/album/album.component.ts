import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { MoviesModel } from '../../models/movie.model';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent {
  isUpdate: boolean = false;
  formMovie: FormGroup;
  listMovies: MoviesModel[] = [];

  constructor(private albumService: AlbumService) {
    this.formMovie = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(''),
      description: new FormControl(''),
      time: new FormControl(''),
      image: new FormControl(''),
      status: new FormControl(true),
    });
    this.list();
  }

  /**
   * Fetch movies from the backend and update the list.
   */
  list() {
    this.albumService.getMovies().subscribe(
      (res) => {
        if (res.success) {
          this.listMovies = res.data;
        }
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  /**
   * Reset the form for adding a new movie.
   */
  newMovie() {
    this.formMovie.reset();
    this.isUpdate = false;
  }

  /**
   * Populate the form with the selected movie's data.
   * @param item Movie to edit
   */
  selectItem(item: MoviesModel) {
    this.isUpdate = true;
    this.formMovie.patchValue(item);
  }

  /**
   * Save a new movie.
   */
  save() {
    const newMovie = this.formMovie.value;
    this.albumService.saveMovie(newMovie).subscribe(
      (res) => {
        if (res.success) {
          this.listMovies.push(res.data); // Add the new movie to the feed.
          this.closeModal();
        }
      },
      (error) => {
        console.error('Error saving movie:', error);
      }
    );
  }

  /**
   * Update an existing movie.
   */
  update() {
    if (this.formMovie.valid) {
      this.albumService.updateMovies(this.formMovie.value).subscribe((res) => {
        if (res.success) {
          this.list(); // Actualiza la lista en pantalla
          this.closeModal(); // Cierra el modal
        }
      });
    }
  }
  
  
  /**
   * Delete a movie by ID and update the feed.
   * @param id ID of the movie to delete
   */
  delete(id: number) {
    this.albumService.deleteMovies(id).subscribe(
      (res) => {
        if (res.success) {
          this.listMovies = this.listMovies.filter((movie) => movie.id !== id); // Remove the movie from the feed.
        }
      },
      (error) => {
        console.error('Error deleting movie:', error);
      }
    );
  }

  /**
   * Close the modal programmatically and reset its state.
   */
   closeModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
    this.formMovie.reset();
    this.isUpdate = false;
  }
}
