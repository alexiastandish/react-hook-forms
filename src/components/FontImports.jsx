import React, { useEffect } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import Button from '@mui/material/Button'

function FontImports({ control, register, openProjectId, watch }) {
    console.log('openProjectId', openProjectId)
    const { fields, append, remove, replace } = useFieldArray({
        name: `projects.${openProjectId}.fonts`,
        control,
    })
    // console.log('FIELDS', fields)

    return (
        <div>
            FontImports
            {fields &&
                fields.length > 0 &&
                fields.map((field, index) => {
                    // console.log('field', field)
                    return (
                        <input
                            {...register(
                                `projects?.${openProjectId}?.fonts?.${index}?.url`
                            )}
                        />
                    )
                })}
            <Button onClick={() => append({ type: 'font', url: '' })}>
                append
            </Button>
        </div>
    )
}
export default FontImports

// import React, { useEffect } from 'react'
// import { useFieldArray, useWatch } from 'react-hook-form'
// import Button from '@mui/material/Button'

// function FontImports({ control, register, openProjectId, watch }) {
//     const { fields, append, remove, replace } = useFieldArray({
//         name: `projects.${openProjectId}.fonts`,
//         control,
//     })

//     // console.log('FIELDS', fields)
//     // const watchFontsArray = watch(`projects.${openProjectId}.fonts`)
//     return (
//         <div>
//             FontImports
//             {fields &&
//                 fields.length > 0 &&
//                 fields.map((field, index) => {
//                     // console.log('index', index)
//                     // console.log('field', field)
//                     return (
//                         <input
//                             key={field.id}
//                             {...register(
//                                 `projects?.${openProjectId}?.fonts?.${index}?.url`
//                             )}
//                         />
//                     )
//                 })}
//             <Button onClick={() => append({ type: 'font', url: '' })}>
//                 append
//             </Button>
//         </div>
//     )
// }
// export default FontImports
