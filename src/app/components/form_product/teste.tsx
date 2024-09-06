import { Input } from "@/components/ui/input"
import React, { useEffect } from "react"

import { useForm, FormProvider, useFormContext, useWatch } from "react-hook-form"

export default function Teste() {
  const methods = useForm()
  const onSubmit = (data:any) => console.log(data)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FildInput id={"n1"}/>
        <FildInput id={"n2"}/>
        <FildInput id={"n3"}/>
        <input type="submit" />
      </form>
    </FormProvider>
  )
}

export function FildInput(props:{id:string}) {
    const {id} = props
    const { register, setValue} = useFormContext()

    if(id=== "n3"){
        const n1 = useWatch({name:"n1"})
        const n2 = useWatch({name:"n2"})
        useEffect(()=>{
            const res = Number(n1) * Number(n2)
            setValue("n3", res)
        },[n1,n2])
    }

    return (
        <label>
            {id}
            <Input {...register(id)} />
        </label>
    )
  }
