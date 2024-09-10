import { useEffect, useMemo } from "react"
import { useFormContext , useWatch} from "react-hook-form"
import { useProductsStore } from "../store/store"
import { Iproduct } from "../types/types"

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

        setValue("total_nota", totalProdutoServico != 0 ? "R$"+totalProdutoServico : "")
        setValue("total_produto_servico", totalProdutoServico != 0 ? "R$"+totalProdutoServico : "")
        setValue("peso_total", totalPeso != 0 ? totalPeso+"kg" : "")
        setValue("volume_total", totalVolume != 0 ? totalVolume+"uni" : "")
    },[useStore]) 
}

export const calcTotalNota = ()=>{
    const { setValue, watch} = useFormContext()
    
    let frete = useWatch({name:"frete"})
    let desconto = useWatch({name:"desconto"})
    let totalProdutoServico = useWatch({name:"total_produto_servico"})

    if(frete == undefined) frete = "0"
    if(desconto == undefined) desconto = "0"
    if(totalProdutoServico == undefined) totalProdutoServico = "0"
    
    useMemo(()=>{
        const v_frete = frete?.replace("R$","")?.replace(",","")
        const v_desconto = desconto?.replace("R$","").replace(",","")
        const v_total = totalProdutoServico?.replace("R$","").replace(",","")
        const res = Number(v_total) + Number(v_frete) - Number(v_desconto)
        
        setValue("total_nota", +res)
    },[frete,desconto,totalProdutoServico])
}

