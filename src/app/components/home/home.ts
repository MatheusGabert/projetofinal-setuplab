import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ConfiguracaoService } from '../../services/configuracao-service';
import { ComponentesService } from '../../services/componentes-service';
import { MinhasConfiguracoes } from '../minhas-configuracoes/minhas-configuracoes';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.css',
})
export class Home {
  configService = inject(ConfiguracaoService);
  compService = inject(ComponentesService);

  // Indicadores gerais

  totalConfiguracoes() {
    return this.configService.configs().length;
  }

  totalInvestido() {
    return this.compService.comps()
      .filter(comp => comp.comprado)
      .reduce((total, comp) => total + comp.preco, 0);
  }

  totalOrcamento() {
    return this.configService.configs()
      .reduce((total, config) => total + config.orcamento, 0);
  }

  orcamentoRestante() {
    return this.totalOrcamento() - this.totalInvestido();
  }

  // Indicadores individuais

  componentesDaConfig(configuracaoId: number) {
    return this.compService.comps()
      .filter(comp => comp.configuracaoId === configuracaoId);
  }

  totalInvestidoConfig(configuracaoId: number) {
    return this.componentesDaConfig(configuracaoId)
      .filter(comp => comp.comprado)
      .reduce((total, comp) => total + comp.preco, 0);
  }

  componentesComprados(configuracaoId: number) {
    return this.componentesDaConfig(configuracaoId)
      .filter(comp => comp.comprado).length;
  }

  componentesPendentes(configuracaoId: number) {
    return this.componentesDaConfig(configuracaoId)
      .filter(comp => !comp.comprado).length;
  }

  progressoCompras(configuracaoId: number) {
    const total = this.componentesDaConfig(configuracaoId).length;

    if (total === 0) {
      return 0;
    }

    return Math.round(
      (this.componentesComprados(configuracaoId) / total) * 100
    );
  }

  orcamentoRestanteConfig(orcamento: number, configuracaoId: number) {
    return orcamento - this.totalInvestidoConfig(configuracaoId);
  }
}
