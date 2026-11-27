import { MinhasConfiguracoes } from './components/minhas-configuracoes/minhas-configuracoes';
import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { NaoEncontrado } from './components/nao-encontrado/nao-encontrado';
import { CadastroConfigs } from './components/cadastro-configs/cadastro-configs';


export const routes: Routes = [

    { path: '', component: Home },
    { path: 'novaConfiguracao', component: CadastroConfigs},
    { path: 'minhasConfiguracoes', component: MinhasConfiguracoes},
    { path: "configuracoes/:id/editar", component: CadastroConfigs},
    { path: '**', component: NaoEncontrado }

];
