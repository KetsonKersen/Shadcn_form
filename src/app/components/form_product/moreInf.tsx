import { memo, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Iproduct, ImoreInf } from "./interface";
import { NumericFormat } from 'react-number-format';
let valor_real = 0
function MoreInf({...props}:any){
    const {stateData} = props
    const { register, watch, setValue} = useForm<ImoreInf>();

    let watchFrete = watch("frete")
    let watchDesconto = watch("desconto")
    const watchNota = watch("total_nota")

    useEffect(()=>{
        let valorServivosProdutos = 0
        let pesoTotal = 0
        let volumeTotal = 0

        stateData?.map((product:Iproduct)=>{
            valorServivosProdutos += Number(product.valor_total.replace("R$","").replace(",",""))
            pesoTotal += (Number(product.peso.replace("kg","")) * Number(product.quantidade.replace("x","")))
            volumeTotal += (Number(product.volume.replace(" uni", "")) * Number(product.quantidade.replace("x","")))
        })

        setValue("total_produto_servico", JSON.stringify(valorServivosProdutos))
        setValue("peso_total", JSON.stringify(pesoTotal))
        setValue("volume_total", JSON.stringify(volumeTotal))
        if(watchNota != ""){
            setValue("total_nota", JSON.stringify(valorServivosProdutos))
        }

        valor_real = valorServivosProdutos
    },[stateData])

    useMemo(()=>{
        if(watchFrete == ""){
            watchFrete = "0"
        }
        if(watchDesconto == ""){
            watchDesconto = "0"
        }

        let res = (Number(valor_real) + Number(watchFrete?.replace("R$","").replace(",",""))) - Number(watchDesconto?.replace("R$","").replace(",",""))
        if(!stateData.length){
            res = 0
        }
        setValue("total_nota", JSON.stringify(res))
    },[watchFrete,watchDesconto])

    function fieldsMoreInf(){
        return(
            <div className="flex flex-col gap-2">
                <h3>Mais informações</h3>
                <hr></hr>
                    <div>
                        <label>
                            Valor do frete
                            <NumericFormat
                                value={watch("frete")}
                                className="foo"
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'R$'} 
                                renderText={(value) => <Input value={value} {...register("frete")} placeholder="R$0" required/>}
                            />
                        </label>
                        <label>
                            Desconto
                            <NumericFormat
                                value={watch("desconto")}
                                className="foo"
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'R$'} 
                                renderText={(value) => <Input value={value} {...register("desconto")} placeholder="R$0" required/>}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Total dos Produtos/Serviços
                            <NumericFormat
                                value={watch("total_produto_servico")}
                                className="foo"
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'R$'} 
                                renderText={(value) => <Input value={value} {...register("total_produto_servico")} placeholder="R$0" required/>}
                            />
                        </label>
                        <label>
                            Total da nota
                            <NumericFormat
                                value={watch("total_nota")}
                                className="foo"
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'R$'} 
                                renderText={(value) => <Input value={value} {...register("total_nota")} placeholder="R$0" required/>}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Pedido de referencia
                            <Input {...register("referencia")} required/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Peso total
                            <NumericFormat
                                value={watch("peso_total")}
                                className="foo"
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'kg'} 
                                renderText={(value) => <Input value={value} {...register("peso_total")} placeholder="0kg" required/>}
                            />
                        </label>
                        <label>
                            Volume total
                            <NumericFormat
                                value={watch("volume_total")}
                                className="foo"
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' uni'} 
                                renderText={(value) => <Input value={value} {...register("volume_total")} placeholder="0kg" required/>}
                            />
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
        <form className="flex flex-col gap-2 p-4 rounded-md border-[1px] border-zinc-200">
            {fieldsMoreInf()}
        </form>
    )
}
export default memo(MoreInf)