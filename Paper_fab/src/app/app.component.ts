import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProdDetailsComponent } from './Components/prod-details/prod-details.component';
import { ProdListComponent } from './Components/prod-list/prod-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProdDetailsComponent, ProdListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Paper_fab';
}
