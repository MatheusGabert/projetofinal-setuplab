import { Component, inject } from '@angular/core';
import { ConfiguracaoService } from '../../services/configuracao-service';
import { RouterLink } from '@angular/router';
import { Configuracao } from '../../models/configuracao-model';
import Swal from 'sweetalert2';

@Component({
  imports: [RouterLink],
  selector: 'app-minhas-configuracoes',
  styleUrl: './minhas-configuracoes.css',
  templateUrl: './minhas-configuracoes.html',
})
export class MinhasConfiguracoes {

  configService = inject(ConfiguracaoService);

  removerConfig(config: Configuracao) {
    Swal.fire({
      icon: "warning",
      title: "Deseja remover esta configuracao ?",
      text: "Esta ação não pode ser desfeita!",
      showCancelButton: true,
      confirmButtonText: "Remover",
      cancelButtonText: "Cancelar"
    }).then(resultado => {
      if (resultado.isConfirmed) {
        this.configService.removerConfig(config.id!).then(() => {
          Swal.fire({
            icon: "success",
            text: "Configuração removida com sucesso."
          })
        })

      }
    })

  }

}
