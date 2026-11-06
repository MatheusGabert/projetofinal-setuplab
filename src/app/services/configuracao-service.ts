import { inject, Injectable, Service, signal } from '@angular/core';
import { Configuracao } from '../models/configuracao-model';
import { DbService } from './db-service';

@Service()
export class ConfiguracaoService {

  dbService = inject(DbService);

  private configsSignal = signal<Configuracao[]>([]);
  configs = this.configsSignal.asReadonly();

  constructor() {
    this.dbService.configs.toArray().then((configs) => {
      this.configsSignal.set(configs);
    });
  }

  getConfig(id: number) {
    return this.dbService.configs.get(id);
  }

  cadastrarConfig(novaConfig: Configuracao) {
    return this.dbService.configs.add(novaConfig).then((novoId) => {
      novaConfig.id = novoId;
      this.configsSignal.update((configs) => [...configs, novaConfig]);
    });
  }

  atualizarConfig(id: number, nome: string, orcamento: number, finalidade: string) {
    return this.dbService.configs
        .update(id, { nome: nome, orcamento: orcamento, finalidade: finalidade })
        .then(() => this.dbService.configs.toArray())
        .then(configs => this.configsSignal.set(configs))
}

removerConfig(id: number) {
 return this.dbService.configs.delete(id).then(() => {
 this.configsSignal.update(configs =>
 configs.filter(config => config.id !== id));
 });
}




}
