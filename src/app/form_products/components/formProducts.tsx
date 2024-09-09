import { FormProvider, useForm } from "react-hook-form"
import { useProductsStore } from "../store/store"
import { formFieldSetProduct } from "./formFieldSetProduct"
import { formFieldMoreinf } from "./formFieldMoreinf"
import { createElement } from "react"

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
        const dateMin = document.querySelector("#min")?.innerHTML
        const dateMax = document.querySelector("#max")?.innerHTML
        Object.assign(product, {prazo_min:dateMin})
        Object.assign(product, {prazo_max:dateMax})
        useStore.addProduct(product)
        clearForm()
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