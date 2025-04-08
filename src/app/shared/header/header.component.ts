import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent {
  logoUrl: string = 'assets/fale_e_veja.png';
  altText: string = 'Logo do Fale e Veja';
}
