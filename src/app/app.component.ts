import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from "./core/components/header/header.component";
import { LoadingSpinnerComponent } from './core/components/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, HeaderComponent, RouterLink, RouterLinkActive, LoadingSpinnerComponent]
})
export class AppComponent {
  title = 'instagram-clone';
}
