import { memo, useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Iproduct } from "./interface";
import { NumericFormat } from 'react-number-format';
import { useForm, FormProvider, useFormContext, useWatch } from "react-hook-form"

function SetProduct({...props}:any){
    const {addProduct} = props
    const methods = useForm()
    const [dateMin, setDateMin] = useState<any>()
    const [dateMax, setDateMax] = useState<any>()


    const onSubmit = (data:{}) => {
        if(dateMin && dateMax){
            Object.assign(data, {prazo_min:format(dateMin, "dd/MM/yyyy")})
            Object.assign(data, {prazo_max:format(dateMax, "dd/MM/yyyy")})
            addProduct(data)
        }else{
            alert("Selecione uma data minima e maxima para continuar...")
        }
    }

    function fieldsDescriptionProducts(){
        return(
            <div className="flex flex-col gap-2">
                <h3>Descrição do Produto/Serviço</h3>
                <hr></hr>
                {/* <div>
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
                </div> */}
                {/* <div>
                    <label>
                        Descrição
                        <Input {...register("descricao")} placeholder="Descrição..."/>
                    </label>
                </div> */}

                <div>
                    <FildInput id={"quantidade"} format={{suffix:" uni"}}/>
                    <FildInput id={"valor"} format={{prefix:"R$"}}/>
                    <FildInput id={"valor_total"} format={{prefix:"R$"}}/>
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
       
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                { fieldsDescriptionProducts() }
                <hr/>
                <Button className="w-full col-start-1 col-end-3">ENVIAR</Button>
            </form>
        </FormProvider>
        
    )
}
export default memo(SetProduct)

export function FildInput(props:{id:string, format?:object}) {
    const {id,format} = props
    const { register, setValue} = useFormContext()

    if(id=== "valor_total"){
        let quantidade = useWatch({name:"quantidade"})
        let valor = useWatch({name:"valor"})
        useEffect(()=>{
            quantidade = quantidade?.replace(" uni","")
            valor = valor?.replace("R$","")

            const res = Number(quantidade) * Number(valor)

            setValue("valor_total", res)
        },[quantidade,valor])
    }
    const inputValue = useWatch({name:id})

    return (
        <label>
            {id.replace("_"," ")}
            <NumericFormat
                value={inputValue}
                className="foo"
                displayType={'text'}
                thousandSeparator={true}
                // prefix={'R$'}
                {...format}
                renderText={(value) => <Input value={value} {...register(id)} required/>}
            />
        </label>
    )
  }