import { useMemo } from "react"
import { useFormContext, useWatch } from "react-hook-form"

export const calcValorTotal = ()=>{
    const { setValue } = useFormContext()
    
    let quantidade = useWatch({name:"quantidade"})
    let valor = useWatch({name:"valor_uni"})
    
    useMemo(()=>{
        quantidade = quantidade?.replace("X","").replace(".","").replace(",","").trim()
        valor = valor?.replace("R$","").replace(".","").replace(",","").trim()

        const res = JSON.stringify(Number(quantidade) * Number(valor))
        setValue("valor_total",  res != "0" ? "R$"+res : "")
    
    },[quantidade,valor])
}
