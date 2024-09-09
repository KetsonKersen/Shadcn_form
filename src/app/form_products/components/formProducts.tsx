import { FormProvider, useForm } from "react-hook-form"
import { useProductsStore } from "../store/store"
import { formFieldSetProduct } from "./formFieldSetProduct"
import { formFieldMoreinf } from "./formFieldMoreinf"

export const FormProducts = ()=>{
    const methods = useForm()
    const useStore = useProductsStore()

    function clearForm(){
        methods.reset()
        methods.setValue("valor_uni", "")
        methods.setValue("quantidade", "")
        methods.setValue("valor_total", "")
        methods.setValue("peso", "")
        methods.setValue("volume", "")
    }

    const onSubmit = (product:any)=>{
        Object.assign(product, {id: Math.floor( Math.random()*999 )})
    
        let dateMin_span = document.querySelector("#min > span")
        let dateMax_span = document.querySelector("#max > span")
        if(dateMin_span?.innerHTML === "Selecione uma data" || dateMin_span?.innerHTML === "Selecione uma data"){
            alert("Selecione uma data para continuar")
            
        }else{
            Object.assign(product, {prazo_min:dateMin_span?.innerHTML})
            Object.assign(product, {prazo_max:dateMax_span?.innerHTML})
            useStore.addProduct(product)
            dateMin_span?.classList.add("clear-date")
            dateMax_span?.classList.add("clear-date")
            clearForm()
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
               {formFieldSetProduct()}
               {formFieldMoreinf()}
            </form>
        </FormProvider>
    )
}