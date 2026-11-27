import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { NaoEncontrado } from './components/nao-encontrado/nao-encontrado';
import { MinhasConfiguracoes } from './components/minhas-configuracoes/minhas-configuracoes';
import { CadastroConfigs } from './components/cadastro-configs/cadastro-configs';
import { CadastroComps } from './components/cadastro-comps/cadastro-comps';

export const routes: Routes = [

    { path: '', component: Home },
    { path: 'novaConfiguracao', component: CadastroConfigs},
    { path: 'novoComponente', component: CadastroComps},
    { path: "configuracoes/:id/editar", component: CadastroConfigs},
    { path: '**', component: NaoEncontrado }

];
