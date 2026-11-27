import { Categoria } from "./categoria";

export interface Componentes {
    id?: number;
    nome: string;
    categoria: Categoria;
    marca: string;
    preco: number;
    comprado: boolean;
    configuracaoId: number;
}