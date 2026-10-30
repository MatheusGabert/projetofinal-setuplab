import { Component, inject, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Configuracao } from '../../models/configuracao-model';
import { ConfiguracaoService } from '../../services/configuracao-service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cadastro-configs',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-configs.html',
  styleUrl: './cadastro-configs.css',
})
export class CadastroConfigs {

  configsService = inject(ConfiguracaoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);


  formConfig = new FormGroup({
    orcamento: new FormControl(0, [Validators.required, Validators.min(0)]),
    finalidade: new FormControl('', Validators.required),
  })





  salvar() {
    if (this.formConfig.valid) {
      const novaConfig: Configuracao = {
        orcamento: this.formConfig.value.orcamento!,
        finalidade: this.formConfig.value.finalidade!,
        dataCriacao: new Date().toLocaleDateString()!
      };
      this.configsService.addConfig(novaConfig).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Configuração Cadastrada!',
          showConfirmButton: false,
          timer: 800,
        });
        this.formConfig.reset();
        this.router.navigate(['/']);
      });
    }
  }


}
