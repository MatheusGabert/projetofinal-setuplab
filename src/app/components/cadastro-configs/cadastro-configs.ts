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

  emEdicao = this.route.snapshot.paramMap.has("id");
  configId = Number(this.route.snapshot.paramMap.get("id"));

  constructor() {
    if (this.emEdicao &&
      (!Number.isInteger(this.configId) || this.configId <= 0)) {
      this.router.navigate(["/"]); return; // interrompe a busca
    }

    if (this.emEdicao) { // no constructor, após validar o id
      this.configsService.getConfig(this.configId).then(config => {
        if (config) this.formConfig.patchValue(config);
        else this.router.navigate(["/"]);
      }).catch(erro => console.error("Falha ao carregar:", erro));
    }
  }




  formConfig = new FormGroup({
    nome: new FormControl('', Validators.required),
    orcamento: new FormControl(0, [Validators.required, Validators.min(0)]),
    finalidade: new FormControl('', Validators.required),
  })

  cadastrarConfig() {
    if (this.formConfig.valid) {
      const novaConfig: Configuracao = {
        nome: this.formConfig.value.nome!,
        orcamento: this.formConfig.value.orcamento!,
        finalidade: this.formConfig.value.finalidade!,
        dataCriacao: new Date().toLocaleDateString()!
      };
      this.configsService.cadastrarConfig(novaConfig).then(() => {
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

  atualizaConfig() {
    this.configsService.atualizarConfig(
      this.configId,
      this.formConfig.value.nome!,
      this.formConfig.value.orcamento!,
      this.formConfig.value.finalidade!
    ).then(() => {
      Swal.fire({ icon: "success", title: "Configuração atualizada com sucesso!", showConfirmButton: false, timer: 1000 })
      this.router.navigate(['/']);
    });
  }

  salvar() {
    this.formConfig.markAllAsTouched(); // permite exibir os erros
    if (this.formConfig.invalid) return; // não envia dados inválidos
    if (this.emEdicao) this.atualizaConfig();
    else this.cadastrarConfig();
  }

}


