import { useEffect, useMemo } from "react"
import { useFormContext, useWatch} from "react-hook-form"

export const calcValorTotal = ()=>{
    const { setValue, watch} = useFormContext()
    
    let quantidade = watch("quantidade")
    let valor = watch("valor_uni")
    
    useEffect(()=>{
        quantidade = quantidade?.replace("X","").replace(".","").replace(",","").trim()
        valor = valor?.replace("R$","").replace(".","").replace(",","").trim()

        const res = JSON.stringify(Number(quantidade) * Number(valor))
        setValue("valor_total",  res != "0" ? "R$"+res : "")
    
    },[quantidade,valor])
}
