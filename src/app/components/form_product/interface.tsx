export interface Iproduct {
    id:number;
    quantidade: String;
    valor_uni: String;
    peso: String;
    volume: String;
    valor_total: String;
    descricao: String;
    prazo_min?: String;
    prazo_max?: String;
}
export interface ImoreInf {
    frete: string;
    desconto: string;
    total_produto_servico: string;
    total_nota: string;
    referencia: string;
    peso_total: string;
    volume_total: string;
    obs: string;
}