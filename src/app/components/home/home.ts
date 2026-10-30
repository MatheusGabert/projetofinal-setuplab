import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ConfiguracaoService } from '../../services/configuracao-service';
import { CadastroConfigs } from '../cadastro-configs/cadastro-configs';

@Component({
  selector: 'app-home',
  imports: [CadastroConfigs],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.css',
})
export class Home {
  configService = inject(ConfiguracaoService);
}
