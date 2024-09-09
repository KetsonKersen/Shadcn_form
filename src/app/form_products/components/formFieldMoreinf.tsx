import { TextField } from "./TextField";

export const formFieldMoreinf = () => {
    return(
        <div className="flex flex-col gap-2 p-4 rounded-md border-[1px] border-zinc-200">
            <div className="flex flex-col gap-2">
                <h3>Mais informações</h3>
                <hr/>
                <div>
                    <label>
                        Valor do frete
                        <TextField id={"frete"} format={{prefix:"R$"}}/>
                    </label>
                    <label>
                        Desconto
                        <TextField id={"desconto"} format={{prefix:"R$"}}/>
                    </label>
                </div>
                <div>
                    <label>
                        Total dos Produtos/Serviços
                        <TextField id={"total_produto_servico"} format={{prefix:"R$"}}/>
                    </label>
                    <label>
                        Total da nota
                        <TextField id={"total_nota"} format={{prefix:"R$"}}/>
                    </label>
                </div>
                <div>
                    <label>
                        Pedido de referencia
                        <TextField id={"referencia"}/>
                    </label>
                </div>
                <div>
                    <label>
                        Peso total
                        <TextField id={"peso_total"} format={{prefix:"kg"}}/>
                    </label>
                    <label>
                        Volume total
                        <TextField id={"volume_total"} format={{suffix:"uni"}}/>
                    </label>
                </div>
                <div>
                    <label>
                        Obs.
                        <TextField id={"obs"} />
                    </label>
                </div>
            </div>
        </div>
    )
}
