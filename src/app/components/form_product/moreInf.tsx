import { Input } from "@/components/ui/input";

export default function MoreInf(){
    return(
        <div className="flex flex-col gap-2">
            <h3>Mais informações</h3>
            <hr></hr>
            <form className="flex flex-col gap-4">
                <div>
                    <label>
                        Valor do frete
                        <Input/>
                    </label>
                    <label>
                        Desconto
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
                        Peso total
                        <Input/>
                    </label>
                    <label>
                        Volume total
                        <Input/>
                    </label>
                    <label>
                        Pedido de referencia
                        <Input/>
                    </label>
                </div>
                <div>
                    <label>
                        Obs.
                        <Input/>
                    </label>
                </div>
            </form>
        </div>
    )
}