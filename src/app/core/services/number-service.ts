import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberService {

  constructor() { }

  porExtensoParaNumero(texto: string): number {
    const unidades: any = {
      'zero': 0, 'um': 1, 'uma': 1, 'dois': 2, 'duas': 2, 'três': 3,
      'quatro': 4, 'cinco': 5, 'seis': 6, 'sete': 7, 'oito': 8, 'nove': 9
    };

    const dezenas: any = {
      'dez': 10, 'onze': 11, 'doze': 12, 'treze': 13, 'quatorze': 14, 'catorze': 14,
      'quinze': 15, 'dezesseis': 16, 'dezessete': 17, 'dezoito': 18, 'dezenove': 19,
      'vinte': 20, 'trinta': 30, 'quarenta': 40, 'cinquenta': 50,
      'sessenta': 60, 'setenta': 70, 'oitenta': 80, 'noventa': 90
    };

    const centenas: any = {
      'cem': 100, 'cento': 100, 'duzentos': 200, 'trezentos': 300,
      'quatrocentos': 400, 'quinhentos': 500, 'seiscentos': 600,
      'setecentos': 700, 'oitocentos': 800, 'novecentos': 900
    };

    const multiplicadores: any = {
      'mil': 1000, 'milhão': 1000000, 'milhões': 1000000, 'bilhão': 1000000000, 'bilhões': 1000000000
    };

    const palavras = texto.toLowerCase().replace(/ e /g, ' ').split(/\s+/);
    let total = 0;
    let atual = 0;

    for (const palavra of palavras) {
      if (unidades[palavra] !== undefined) {
        atual += unidades[palavra];
      } else if (dezenas[palavra] !== undefined) {
        atual += dezenas[palavra];
      } else if (centenas[palavra] !== undefined) {
        atual += centenas[palavra];
      } else if (multiplicadores[palavra] !== undefined) {
        atual *= multiplicadores[palavra];
        total += atual;
        atual = 0;
      }
    }

    return total + atual;
  }


  numeroParaExtenso(valor: number): string {
    if (isNaN(valor)) return '';

    const unidades = [
      '', 'um', 'dois', 'três', 'quatro', 'cinco',
      'seis', 'sete', 'oito', 'nove'
    ];
    const especiais = [
      'dez', 'onze', 'doze', 'treze', 'quatorze',
      'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'
    ];
    const dezenas = [
      '', '', 'vinte', 'trinta', 'quarenta', 'cinquenta',
      'sessenta', 'setenta', 'oitenta', 'noventa'
    ];
    const centenas = [
      '', 'cento', 'duzentos', 'trezentos', 'quatrocentos',
      'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'
    ];

    if (valor === 100) return 'cem';
    if (valor === 0) return 'zero';

    let partes = [];

    const c = Math.floor(valor / 100);
    const d = Math.floor((valor % 100) / 10);
    const u = valor % 10;

    if (c > 0) partes.push(centenas[c]);

    if (d === 1) {
      partes.push(especiais[u]);
    } else {
      if (d > 1) partes.push(dezenas[d]);
      if (u > 0) partes.push(unidades[u]);
    }

    return partes.join(' e ');
  }


}
