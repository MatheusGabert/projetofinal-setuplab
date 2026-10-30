import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { NaoEncontrado } from './components/nao-encontrado/nao-encontrado';
import { MinhasConfiguracoes } from './components/minhas-configuracoes/minhas-configuracoes';

export const routes: Routes = [

    { path: '', component: Home },
    { path: 'minhas-configuracoes', component: MinhasConfiguracoes},
    { path: '**', component: NaoEncontrado }

];
