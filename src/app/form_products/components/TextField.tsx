import { Input } from "@/components/ui/input"
import { useFormContext, useWatch } from "react-hook-form"
import { NumericFormat } from "react-number-format"
import { calcValorTotal } from "@/app/form_products/functions/calcSetProduct"
import { calcTotalNota, setValuesMoreInf } from "../functions/calcMoreInf"
import { ItextField } from "../types/types"

export function TextField(props:ItextField) {
    const {id , format} = props
    const inputValue = useWatch({name:id})
    const { register } = useFormContext()
    
    switch(id){
        case "valor_total":
            calcValorTotal()
            break;
        case "total_produto_servico":
            setValuesMoreInf()
            break;
        case "total_nota":
            calcTotalNota()
            break;
        default:
            break;
    }
    
    const TypeInput = format
    ?  
        <NumericFormat
            value={inputValue}
            className="foo"
            displayType={'text'}
            thousandSeparator={true}
            {...format}
            renderText={(value) => <Input value={value} {...register(id)}/>}
        />
    :
        <Input {...register(id)}/>
    
    return TypeInput
  }