import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "./store";

export default function SetProduct(){
    const {addProduct} = useContext<any>(GlobalContext)
    const { register, handleSubmit, reset, watch} = useForm<IFormInput>();

    interface IFormInput {
        quantidade: String;
        valor_uni: String;
        peso: String;
        volume: String;
        valor_total: String;
        descricao: String;
        prazo_min: String;
        prazo_max: String;
      }

    const onSubmit: SubmitHandler<IFormInput> = (data:{}) => {
        addProduct(data)
        reset()
    }
    const watchQuantidade = watch("quantidade")
    const watchValorUni = watch("valor_uni")


    const [calc,setCalc] = useState(0)
    useEffect(()=>{
        let res:number = (Number(watchQuantidade) * Number(watchValorUni))
        if(!Number.isNaN(res)){
            setCalc(res)
        }
    },[watchQuantidade, watchValorUni])

    return(
        <div className="flex flex-col gap-2">
            <h3>Descrição do Produto/Serviço</h3>
            <hr></hr>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div>
                    <label>
                        Quantidade
                        <Input {...register("quantidade")}/>
                    </label>
                    <label>
                        Valor unitario
                        <Input {...register("valor_uni")}/>
                    </label>
                    <label>
                        Peso
                        <Input {...register("peso")}/>
                    </label>
                </div>
                <div>
                    <label>
                        Volume
                        <Input {...register("volume")}/>
                    </label>
                    <label>
                        Valor Total
                        <Input value={calc} {...register("valor_total")}/>
                    </label>
                </div>
                <div>
                    <label>
                        Descrição
                        <Input {...register("descricao")}/>
                    </label>
                </div>
                <div>
                    <label>
                        Prazo minimo
                        <Input {...register("prazo_min")}/>
                    </label>
                    <label>
                        Prazo maximo
                        <Input {...register("prazo_max")}/>
                    </label>
                </div>
                <Button>ENVIAR</Button>
            </form>
        </div>
    )
}