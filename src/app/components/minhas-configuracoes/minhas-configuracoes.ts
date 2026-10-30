import { Component, inject } from '@angular/core';
import { ConfiguracaoService } from '../../services/configuracao-service';

@Component({
  imports: [],
  selector: 'app-minhas-configuracoes',
  styleUrl: './minhas-configuracoes.css',
  templateUrl: './minhas-configuracoes.html',
})
export class MinhasConfiguracoes {

  configService = inject(ConfiguracaoService);


}
