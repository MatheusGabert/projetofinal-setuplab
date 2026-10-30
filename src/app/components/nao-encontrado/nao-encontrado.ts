import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nao-encontrado',
  imports: [RouterLink],
  templateUrl: './nao-encontrado.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './nao-encontrado.css',
})
export class NaoEncontrado {}
