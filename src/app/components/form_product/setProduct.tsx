import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
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
    
    const [calc,setCalc] = useState('')
    
    useEffect(()=>{
        let res:number = (Number(watchQuantidade) * Number(watchValorUni))
        if(!Number.isNaN(res)){
            const formatted = new Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(res)
            setCalc(formatted)
        }
    },[watchQuantidade, watchValorUni])
    
    console.log("Renderizou o form")

    function fieldsDescriptionProducts(){
        return(
            <div className="flex flex-col gap-2">
                <h3>Descrição do Produto/Serviço</h3>
                <hr></hr>
                <div>
                    <label>
                        Quantidade
                        <Input {...register("quantidade")} placeholder="0"/>
                    </label>
                    <label>
                        Valor unitario
                        <Input {...register("valor_uni")} placeholder="0"/>
                    </label>
                    <label>
                        Peso
                        <Input {...register("peso")} placeholder="0kg"/>
                    </label>
                </div>
                <div>
                    <label>
                        Volume
                        <Input {...register("volume")} placeholder="0"/>
                    </label>
                    <label>
                        Valor Total
                        <Input defaultValue={calc} {...register("valor_total")} placeholder="R$0"/>
                    </label>
                </div>
                <div>
                    <label>
                        Descrição
                        <Input {...register("descricao")} placeholder="..."/>
                    </label>
                </div>
                <div>
                    <label>
                        Prazo minimo
                        <Input {...register("prazo_min")} placeholder="00/00/00"/>
                    </label>
                    <label>
                        Prazo maximo
                        <Input {...register("prazo_max")} placeholder="00/00/00"/>
                    </label>
                </div>
            </div>
        )
    }

    function fieldsMoreInf(){
        return(
            <div className="flex flex-col gap-2">
                <h3>Mais informações</h3>
                <hr></hr>
                    <div>
                        <label>
                            Valor do frete
                            <Input/>
                        </label>
                        <label>
                            Desconto
                            <Input/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Total dos Produtos/Serviços
                            <Input/>
                        </label>
                        <label>
                            Total da nota
                            <Input/>
                        </label>
                        <label>
                            Pedido de referencia
                            <Input/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Peso total
                            <Input/>
                        </label>
                        <label>
                            Volume total
                            <Input/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Obs.
                            <Input/>
                        </label>
                    </div>
            </div>
        )
    }

    return(
        <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                { fieldsDescriptionProducts() }
                { fieldsMoreInf() }
                <Button className="w-full col-start-1 col-end-3">ENVIAR</Button>
            </form>
        </div>
    )
}