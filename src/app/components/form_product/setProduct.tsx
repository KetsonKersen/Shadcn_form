import { memo, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Iproduct } from "./interface";

function SetProduct({...props}:any){
    const {addProduct} = props
    
    const { register, handleSubmit, reset, watch, setValue} = useForm<Iproduct>();
    const watchQuantidade = watch("quantidade")
    const watchValorUni = watch("valor_uni")
    const watchFrete = watch("frete")
    const watchDesconto = watch("desconto")
    const watchPeso = watch("peso")
    const watchVolume = watch("volume")

    const [dateMin, setDateMin] = useState<any>()
    const [dateMax, setDateMax] = useState<any>()

    const onSubmit: SubmitHandler<Iproduct> = (data:{}) => {
        if(dateMin && dateMax){
            Object.assign(data, {prazo_min:format(dateMin, "dd/MM/yyyy")})
            Object.assign(data, {prazo_max:format(dateMax, "dd/MM/yyyy")})
            addProduct(data)
            reset()
            setDateMin(new Date())
            setDateMax(new Date())
        }else{
            alert("Digite todos os campos")
        }
    }

    useEffect(()=>{
        let res:number = (Number(watchQuantidade) * Number(watchValorUni))
        if(!Number.isNaN(res)){
            setValue("valor_total", JSON.stringify(res))

            let produtos_servicos = Number(res) + Number(watchFrete)
            setValue("total_produto_servico", JSON.stringify(produtos_servicos))
            
            let valor_nota = produtos_servicos - Number(watchDesconto)
            setValue("total_nota", JSON.stringify(valor_nota))
            
            let peso_total = Number(watchQuantidade) * Number(watchPeso)
            setValue("peso_total", JSON.stringify(peso_total))
            
            let volume_total = Number(watchQuantidade) * Number(watchVolume)
            setValue("volume_total", JSON.stringify(volume_total))
        }
    },[watchQuantidade, watchValorUni, watchFrete, watchDesconto, watchPeso, watchVolume])

    function fieldsDescriptionProducts(){
        return(
            <div className="flex flex-col gap-2">
                <h3>Descrição do Produto/Serviço</h3>
                <hr></hr>
                <div>
                    <label>
                        Quantidade
                        <Input {...register("quantidade")} placeholder="0x" required/>
                    </label>
                    <label>
                        Valor unitario
                        <Input {...register("valor_uni")} placeholder="R$0" required/>
                    </label>
                    <label>
                        Peso
                        <Input {...register("peso")} placeholder="0kg" required/>
                    </label>
                </div>
                <div>
                    <label>
                        Volume
                        <Input {...register("volume")} placeholder="0" required/>
                    </label>
                    <label>
                        Valor Total
                        <Input {...register("valor_total")} placeholder="R$0" required/>
                    </label>
                </div>
                <div>
                    <label>
                        Descrição
                        <Input {...register("descricao")} placeholder="Descrição..."/>
                    </label>
                </div>
                <div>
                    <label>
                        Prazo minimo
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !dateMin && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateMin ? format(dateMin, "PPP") : <span>Selecione uma data</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={dateMin}
                                onSelect={setDateMin}
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </label>
                    <label>
                        Prazo maximo
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !dateMax && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateMax ? format(dateMax, "PPP") : <span>Selecione uma data</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={dateMax}
                                onSelect={setDateMax}
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
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
                            <Input {...register("frete")} placeholder="R$0" required/>
                        </label>
                        <label>
                            Desconto
                            <Input {...register("desconto")} placeholder="R$0" required/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Total dos Produtos/Serviços
                            <Input {...register("total_produto_servico")} placeholder="R$0" required/>
                        </label>
                        <label>
                            Total da nota
                            <Input {...register("total_nota")} placeholder="R$0" required/>
                        </label>
                        <label>
                            Pedido de referencia
                            <Input {...register("referencia")} required/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Peso total
                            <Input {...register("peso_total")} placeholder="0kg" required/>
                        </label>
                        <label>
                            Volume total
                            <Input {...register("volume_total")} placeholder="R$0" required/>
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
        <div className="flex flex-col gap-2 p-4 rounded-md border-[1px] border-zinc-200">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                { fieldsDescriptionProducts() }
                { fieldsMoreInf() }
                <Button className="w-full col-start-1 col-end-3">ENVIAR</Button>
            </form>
        </div>
    )
}
export default memo(SetProduct)