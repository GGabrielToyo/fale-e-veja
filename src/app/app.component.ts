import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NumberService } from './core/services/number-service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'fale-e-veja';
  palavra = '';
  tipoSelecionado: 'numero' | 'letra' = 'letra';
  escutando = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private numberService: NumberService
  ) { }

  async reconhecerVoz() {
    this.escutando = true;
    this.cdr.detectChanges();

    try {
      const resultado = await this.escutarPalavra();
      if (this.tipoSelecionado === 'numero') {
        const numero = this.numberService.porExtensoParaNumero(resultado);
        this.palavra = numero.toString();
      } else {
        if (!isNaN(Number(resultado))) {
          const numero = this.numberService.numeroParaExtenso(Number(resultado));
          this.palavra = numero.toString();
        } else {
          this.palavra = resultado;
        }
      }
    } catch (error) {
      console.error('Erro ao escutar:', error);
      this.palavra = 'Erro ao escutar';
      window.location.reload();
    } finally {
      this.escutando = false;
      this.cdr.detectChanges();
    }
  }

  escutarPalavra(): Promise<string> {
    return new Promise((resolve, reject) => {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const texto = event.results[0][0].transcript;
        resolve(texto);
      };

      recognition.onerror = (event: any) => {
        reject(event.error);
        window.location.reload();
      };

      recognition.onend = () => {
        // Não faz nada aqui, quem controla `escutando` é o `reconhecerVoz()`
      };

      recognition.start();
    });
  }

  teste() {
    const texto = '4 vezes 4';

    if (this.tipoSelecionado === 'numero') {
      const numero = this.numberService.porExtensoParaNumero(texto);
      this.palavra = numero.toString();
    } else {
      if (!isNaN(Number(texto))) {
        const numero = this.numberService.numeroParaExtenso(Number(texto));
        this.palavra = numero.toString();
      } else {
        this.palavra = texto;
      }
    }
  }

}
