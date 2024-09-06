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
import { NumericFormat } from 'react-number-format';

function SetProduct({...props}:any){
    const {addProduct} = props
    
    const { register, handleSubmit, reset, watch, setValue} = useForm<Iproduct>();
    const watchQuantidade = watch("quantidade")
    const watchValorUni = watch("valor_uni")

    const [dateMin, setDateMin] = useState<any>()
    const [dateMax, setDateMax] = useState<any>()

    
    function clearForm(){
        reset()
        setValue("quantidade", "")
        setValue("valor_uni", "")
        setValue("peso", "")
        setValue("volume", "")
        setValue("valor_total", "")
        setDateMin("")
        setDateMax("")
    }

    const onSubmit: SubmitHandler<Iproduct> = (data:{}) => {
        if(dateMin && dateMax){
            Object.assign(data, {prazo_min:format(dateMin, "dd/MM/yyyy")})
            Object.assign(data, {prazo_max:format(dateMax, "dd/MM/yyyy")})
            addProduct(data)
            clearForm()
        }else{
            alert("Selecione uma data minima e maxima para continuar...")
        }
    }

    useEffect(()=>{
        let res:number = (Number(watchQuantidade?.replace("x","")) * Number(watchValorUni?.replace("R$","").replace(",","")))
        if(!Number.isNaN(res)){
            setValue("valor_total", JSON.stringify(res))
        }
    },[watchQuantidade, watchValorUni])

    function fieldsDescriptionProducts(){
        return(
            <div className="flex flex-col gap-2">
                <h3>Descrição do Produto/Serviço</h3>
                <hr></hr>
                <div>
                    <label>
                        Quantidade
                        <NumericFormat
                            value={JSON.stringify(watch("quantidade"))}
                            className="foo"
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'x'} 
                            renderText={(value) => <Input value={value} {...register("quantidade")} placeholder="x0" required/>}
                        />
                    </label>
                    <label>
                        Valor unitario
                        <NumericFormat
                            value={JSON.stringify(watch("valor_uni"))}
                            className="foo"
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'R$'} 
                            renderText={(value) => <Input value={value} {...register("valor_uni")} placeholder="R$0" required/>}
                        />
                    </label>
                    <label>
                        Peso
                        <NumericFormat
                            value={JSON.stringify(watch("peso"))}
                            className="foo"
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'kg'} 
                            renderText={(value) => <Input value={value} {...register("peso")} placeholder="0kg" required/>}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Volume
                        <NumericFormat
                                value={JSON.stringify(watch("volume"))}
                                className="foo"
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' uni'} 
                                renderText={(value) => <Input value={value} {...register("volume")} placeholder="0 uni" required/>}
                            />
                    </label>
                    <label>
                        Valor Total
                        <NumericFormat
                             value={JSON.stringify(watch("valor_total"))}
                             className="foo"
                             displayType={'text'}
                             thousandSeparator={true}
                             prefix={'R$'}
                            renderText={(value) => <Input value={value} {...register("valor_total")} placeholder="R$0" required/>}
                        />
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

    return(
       
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 rounded-md border-[1px] border-zinc-200">
            { fieldsDescriptionProducts() }
            <hr/>
            <Button className="w-full col-start-1 col-end-3">ENVIAR</Button>
        </form>
        
    )
}
export default memo(SetProduct)