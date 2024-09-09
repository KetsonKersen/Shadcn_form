import { Button } from "@/components/ui/button";
import { DateField } from "@/app/form_products/components/DateField";
import { TextField } from "@/app/form_products/components/TextField";

export const formFieldSetProduct = () =>{
    return(
        <div className="flex flex-col gap-4 p-4 rounded-md border-[1px] border-zinc-200">
            <div className="flex flex-col gap-2">
                <h3>Descrição do Produto/Serviço</h3>
                <hr/>
                
                <div>
                    <label>
                        Quantidade
                        <TextField id={"quantidade"} format={{prefix:"X"}} required={true}/>
                    </label>
                    <label>
                        Valor unitario
                        <TextField id={"valor_uni"} format={{prefix:"R$"}} required={true}/>
                    </label>
                    <label>
                        Valor total
                        <TextField id={"valor_total"} format={{prefix:"R$"}}/>
                    </label>
                </div>

                <div>
                    <label>
                        Peso
                        <TextField id={"peso"} format={{suffix:"kg"}} required={true}/>
                    </label>
                    <label>
                        Volume
                        <TextField id={"volume"} format={{suffix:"uni"}} required={true}/>
                    </label>
                </div>

                <div>
                    <label>
                        Prazo minimo
                        <DateField id={"min"}/>
                    </label>
                    <label>
                        Prazo maximo
                        <DateField id={"max"}/>
                    </label>
                </div>
                
                <div>
                    <label>
                        Descrição
                        <TextField id={"descricao"} required={true}/>
                    </label>
                </div>
            </div>

            <hr/>
            <Button className="w-full col-start-1 col-end-3">ENVIAR</Button>
        </div> 
    )
}
