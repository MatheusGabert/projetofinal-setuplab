import { Component, inject } from '@angular/core';
import { ComponentesService } from '../../services/componentes-service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../models/categoria';
import { Componentes } from '../../models/componentes-model';
import { ConfiguracaoService } from '../../services/configuracao-service';


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-cadastro-comps',
  styleUrl: './cadastro-comps.css',
  templateUrl: './cadastro-comps.html',
})
export class CadastroComps {

  compService = inject(ComponentesService);
  configsService = inject(ConfiguracaoService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected readonly categoria = Object.values(Categoria);

  CompEmEdicao = this.route.snapshot.paramMap.has("id");
  compId = Number(this.route.snapshot.paramMap.get("id"));

  constructor() {
    if (this.CompEmEdicao &&
      (!Number.isInteger(this.compId) || this.compId <= 0)) {
      this.router.navigate(["/"]); return; // interrompe a busca
    }

    if (this.CompEmEdicao) { // no constructor, após validar o id
      this.compService.getComps(this.compId).then(comp => {
        if (comp) this.formComp.patchValue(comp);
        else this.router.navigate(["/"]);
      }).catch(erro => console.error("Falha ao carregar:", erro));
    }
  }

  formComp = new FormGroup({
    nome: new FormControl('', Validators.required),
    categoria: new FormControl<Categoria | null>(null, Validators.required),
    marca: new FormControl('', Validators.required),
    preco: new FormControl(0, [Validators.required, Validators.min(0)]),
    comprado: new FormControl<boolean | null>(false, Validators.required),
    configuracaoId: new FormControl(0, Validators.required)
  })

  cadastrarComp() {
    if (this.formComp.valid) {
      const novoComp: Componentes = {
        nome: this.formComp.value.nome!,
        categoria: this.formComp.value.categoria!,
        marca: this.formComp.value.marca!,
        preco: this.formComp.value.preco!,
        comprado: this.formComp.value.comprado!,
        configuracaoId: this.formComp.value.configuracaoId!,
      };
      this.compService.cadastrarComp(novoComp).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Componente Cadastrado!',
          showConfirmButton: false,
          timer: 800,
        });
        this.formComp.reset();
        this.router.navigate(['/']);
      });
    }
  }

  atualizaComp() {
    this.compService.atualizarComp(
      this.compId,
      this.formComp.value.nome!,
      this.formComp.value.categoria!,
      this.formComp.value.marca!,
      this.formComp.value.preco!,
      this.formComp.value.comprado!,
      this.formComp.value.configuracaoId!
    ).then(() => {
      Swal.fire({ icon: "success", title: "Componente atualizado com sucesso!", showConfirmButton: false, timer: 1000 })
      this.router.navigate(['/']);
    });
  }

  salvar() {
    this.formComp.markAllAsTouched(); // permite exibir os erros
    if (this.formComp.invalid) return; // não envia dados inválidos
    if (this.CompEmEdicao) this.atualizaComp();
    else this.cadastrarComp();
  }


  /* removerComp(Comp: Componentes) {
     Swal.fire({
       icon: "warning",
       title: "Deseja remover este componente ?",
       text: "Esta ação não pode ser desfeita!",
       showCancelButton: true,
       confirmButtonText: "Remover",
       cancelButtonText: "Cancelar"
     }).then(resultado => {
       if (resultado.isConfirmed) {
         this.configService.removerComponente(config.id!).then(() => {
           Swal.fire({
             icon: "success",
             text: "Componente removido com sucesso."
           })
         })
 
       }
     })
 
   }*/

}
