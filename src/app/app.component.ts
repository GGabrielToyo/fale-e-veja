import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'fale-e-veja';
  palavra = '';
  escutando = false;

  constructor() { }

  reconhecerVoz() {
    this.escutando = true;

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event: any) => {
      const texto = event.results[0][0].transcript;
      this.palavra = texto;
    };

    recognition.onend = () => {
      this.escutando = false;
    };
   
  }

}
