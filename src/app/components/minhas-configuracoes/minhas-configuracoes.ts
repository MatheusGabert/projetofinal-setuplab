import { Component, inject } from '@angular/core';
import { ConfiguracaoService } from '../../services/configuracao-service';
import { RouterLink } from '@angular/router';
import { Configuracao } from '../../models/configuracao-model';
import Swal from 'sweetalert2';
import { ComponentesService } from '../../services/componentes-service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Componentes } from '../../models/componentes-model';
import { Categoria } from '../../models/categoria';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-minhas-configuracoes',
  styleUrl: './minhas-configuracoes.css',
  templateUrl: './minhas-configuracoes.html',
})
export class MinhasConfiguracoes {
  configService = inject(ConfiguracaoService);
  compService = inject(ComponentesService);

  configSelecionada = '';

  protected readonly categoria = Object.values(Categoria);

  formComp = new FormGroup({
    nome: new FormControl('', Validators.required),
    categoria: new FormControl<Categoria | null>(null, Validators.required),
    marca: new FormControl('', Validators.required),
    preco: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    comprado: new FormControl<boolean | null>(false, Validators.required),
    configuracaoId: new FormControl(0, Validators.required),
  });

  buscarComponentes(configuracaoId: number) {
    return this.compService.getComp(configuracaoId);
  }

  idCompEditando: number | null = null;

  cadastrarComp() {
    if (this.formComp.valid) {
      // EDITAR COMPONENTE

      if (this.idCompEditando !== null) {
        this.compService
          .atualizarComp(
            this.idCompEditando,
            this.formComp.value.nome!,
            this.formComp.value.categoria!,
            this.formComp.value.marca!,
            this.formComp.value.preco!,
            this.formComp.value.comprado!,
            this.formComp.value.configuracaoId!,
          )
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Componente atualizado com sucesso!',
              showConfirmButton: false,
              timer: 1000,
            });
            document.getElementById('fecharModal')?.click();
            this.idCompEditando = null;
            this.formComp.reset();
          });

        return;
      }

      // CADASTRAR COMPONENTE
      const categoriaSelecionada = this.formComp.value.categoria!;
      const configuracaoId = this.formComp.value.configuracaoId!;

      const categoriaExistente = this.compService
        .getComp(configuracaoId)
        .filter((comp) => comp.categoria === categoriaSelecionada);

      if (categoriaExistente.length > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Categoria já cadastrada!',
          text: 'Essa configuração já possui um componente dessa categoria.',
        });
        return;
      }

      const novoComp: Componentes = {
        nome: this.formComp.value.nome!,
        categoria: categoriaSelecionada,
        marca: this.formComp.value.marca!,
        preco: this.formComp.value.preco!,
        comprado: this.formComp.value.comprado!,
        configuracaoId: configuracaoId,
      };

      this.compService.cadastrarComp(novoComp).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Componente cadastrado!',
          showConfirmButton: false,
          timer: 800,
        });
        document.getElementById('fecharModal')?.click();
        this.formComp.reset();
      });
    }
  }

  //editar componente
  editarComp(componente: Componentes) {
    this.idCompEditando = componente.id!;

    this.configSelecionada =
      this.configService.configs().find((config) => config.id === componente.configuracaoId)
        ?.nome ?? '';

    this.formComp.patchValue({
      nome: componente.nome,
      categoria: componente.categoria,
      marca: componente.marca,
      preco: componente.preco,
      comprado: componente.comprado,
      configuracaoId: componente.configuracaoId,
    });

    this.formComp.get('categoria')?.disable();
  }

  //remover configuracao
  removerConfig(config: Configuracao) {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja remover esta configuracao ?',
      text: 'Esta ação não pode ser desfeita!',
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.configService.removerConfig(config.id!).then(() => {
          Swal.fire({
            icon: 'success',
            text: 'Configuração removida com sucesso.',
          });
        });
      }
    });
  }

  //remover componente
  removerComp(comp: Componentes) {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja remover este componente?',
      text: 'Esta ação não pode ser desfeita!',
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.compService.removerComps(comp.id!).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Componente removido!',
            showConfirmButton: false,
            timer: 800,
          });
        });
      }
    });
  }

  //funcao para marcar componente como comprado ou nao comprado
  marcarComprado(componente: Componentes) {
    this.compService.atualizarComp(
      componente.id!,
      componente.nome,
      componente.categoria,
      componente.marca,
      componente.preco,
      !componente.comprado,
      componente.configuracaoId,
    );
  }
}
