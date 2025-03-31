import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlbumComponent } from "./components/album/album.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlbumComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-movies';
}
