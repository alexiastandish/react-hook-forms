// import { useMemo } from 'react'

// function useProjectForm(ids) {
//     const methods = useForm({
//         mode: 'onChange',
//         name: 'projectForms',
//         defaultValues: useMemo(() => {
//             const defaults = {}
//             ids.forEach((id, index) => {
//                 defaults[id] = { id, title: '', fonts: [] }
//             })
//             return {
//                 projectForms: { ...defaults },
//             }
//         }, [ids]),
//     })

//     const handleSubmit = (values) => {
//         console.log('values', values)
//     }

//     const values = methods.getValues()
//     console.log('values', values)
//     return {
//         methods,
//         handleSubmit: methods.handleSubmit(handleSubmit),
//         values,
//     }
// }
// export default useProjectForm

import { useForm } from 'react-hook-form'

const useProjectForms = () => {
    const methods = useForm({
        mode: 'onChange',
        name: 'projectForms',
        defaultValues: { projectForms: {} },
    })

    return { methods }
}

export default useProjectForms
