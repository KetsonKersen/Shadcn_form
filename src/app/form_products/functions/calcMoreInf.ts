import { useEffect } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { useProductsStore } from "../store/store"

export const setValuesMoreInf = ()=>{
    const useStore = useProductsStore()
    const { setValue } = useFormContext()
    
    let totalProdutoServico = 0
    let totalPeso = 0
    let totalVolume = 0

    useEffect(()=>{
        useStore.products.map((product)=>{
            totalProdutoServico += Number(product.valor_total?.replace("R$","").replace(",",""))
            totalPeso += Number(product.quantidade?.replace("X","").replace(",","")) * Number(product.peso?.replace("kg","").replace(",",""))
            totalVolume +=  Number(product.quantidade?.replace("X","").replace(",","")) * Number(product.volume?.replace("uni","").replace(",",""))
        })
        setValue("total_produto_servico", totalProdutoServico)
        setValue("peso_total",totalPeso)
        setValue("volume_total",totalVolume)
    },[useStore])
}

export const calcTotalNota = ()=>{
    const { setValue } = useFormContext()
    
    let frete = useWatch({name:"frete"})
    let desconto = useWatch({name:"desconto"})
    let total_produto_servivo = useWatch({name:"total_produto_servico"})

    useEffect(()=>{
        if(frete == "") frete = "0"
        if(desconto == "") desconto = "0"

        let res = (Number(total_produto_servivo) + Number(frete?.replace("R$","").replace(",",""))) - Number(desconto?.replace("R$","").replace(",",""))

        setValue("total_nota", "R$" + res)
    },[frete,desconto,total_produto_servivo])
}

