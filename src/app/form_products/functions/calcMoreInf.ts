import { useEffect, useMemo } from "react"
import { useFormContext , useWatch} from "react-hook-form"
import { useProductsStore } from "../store/store"
import { Iproduct } from "../types/types"


let valorReal = 0
export const setValuesMoreInf = ()=>{
    const useStore = useProductsStore()
    const { setValue } = useFormContext()
    
    let totalProdutoServico = 0
    let totalPeso = 0
    let totalVolume = 0

    useEffect(()=>{
        useStore.products.map((product:Iproduct)=>{
            totalProdutoServico += Number(product.valor_total?.replace("R$","").replace(",",""))
            totalPeso += Number(product.quantidade?.replace("X","").replace(",","")) * Number(product.peso?.replace("kg","").replace(",",""))
            totalVolume +=  Number(product.quantidade?.replace("X","").replace(",","")) * Number(product.volume?.replace("uni","").replace(",",""))
        })

        setValue("total_produto_servico", totalProdutoServico != 0 ? "R$"+totalProdutoServico : "")
        setValue("peso_total", totalPeso != 0 ? totalPeso+"kg" : "")
        setValue("volume_total", totalVolume != 0 ? totalVolume+"uni" : "")
        valorReal = totalProdutoServico
    },[useStore]) 
}

export const calcTotalNota = ()=>{
    const { setValue } = useFormContext()
    
    let frete = useWatch({name:"frete"})
    let desconto = useWatch({name:"desconto"})
    let totalProdutoServico = useWatch({name:"total_produto_servico"})

    useEffect(()=>{
        frete = frete?.replace("R$","").replace(".","").replace(",","").trim()
        desconto = desconto?.replace("R$","").replace(".","").replace(",","").trim()
        totalProdutoServico = totalProdutoServico?.replace("R$","").replace(".","").replace(",","").trim()
        const res = Number(totalProdutoServico) + Number(frete) - Number(desconto)
        setValue("total_nota", res != 0 ? res +"R$" : "")
    },[frete,desconto,totalProdutoServico])
}

