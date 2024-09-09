export type Iproduct = {
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
export type IProductsStore = {
    products: Iproduct[],
    addProduct: (product:Iproduct)=> void,
    removeProduct: any
}
export type ItextField= {
    id:string
    format?:object
    required?: boolean
}