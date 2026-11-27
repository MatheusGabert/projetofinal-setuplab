import { inject, Service, signal } from '@angular/core';
import { DbService } from './db-service';
import { Componentes } from '../models/componentes-model';
import { Categoria } from '../models/categoria';

@Service()
export class ComponentesService {

    dbService = inject(DbService);

    private configsSignal = signal<Componentes[]>([]);
    comps = this.configsSignal.asReadonly();

    constructor() {
        this.dbService.comps.toArray().then((comps) => {
            this.configsSignal.set(comps);
        });
    }

   //Preciso pegar o ID e fazer com que apareça na tela inicial os componentes que estão cadastrados na configuração, então preciso de uma função que me retorne os componentes de acordo com o ID da configuração.

    getComps(id: number) {
        return this.dbService.comps.get(id);
    }

    cadastrarComp(novoComp: Componentes) {
        return this.dbService.comps.add(novoComp).then((novoId) => {
            novoComp.id = novoId;
            this.configsSignal.update((comps) => [...comps, novoComp]);
        });
    }

    atualizarComp(id: number, nome: string, categoria: Categoria, marca: string, preco: number, comprado: boolean, configuracaoId: number) {
        return this.dbService.comps
            .update(id, { nome: nome, categoria: categoria, marca: marca, preco: preco, comprado: comprado, configuracaoId: configuracaoId })
            .then(() => this.dbService.comps.toArray())
            .then(comps => this.configsSignal.set(comps))
    }

    removerConfig(id: number) {
        return this.dbService.configs.delete(id).then(() => {
            this.configsSignal.update(configs =>
                configs.filter(config => config.id !== id));
        });
    }

}
