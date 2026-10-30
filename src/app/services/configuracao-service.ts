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

  addConfig(novaConfig: Configuracao) {
    return this.dbService.configs.add(novaConfig).then((novoId) => {
      novaConfig.id = novoId;
      this.configsSignal.update((configs) => [...configs, novaConfig]);
    });
  }


}
