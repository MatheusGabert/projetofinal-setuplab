import { Service } from '@angular/core';
import Dexie, {Table} from 'dexie';
import { Configuracao } from '../models/configuracao-model';
import { Componentes } from '../models/componentes-model';


@Service()
export class DbService extends Dexie{
    configs!: Table<Configuracao, number>;
    peças!: Table<Componentes, number>;

    constructor(){
        super("SetupLabDB");
        this.version(1).stores({
            configs: "id++, nome, orcamento, finalidade, dataCriacao",
            peças: "id++, nome, categoria, marca, preco, comprado, configuracaoId"
        });
    }
}
