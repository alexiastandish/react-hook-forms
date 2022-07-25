import Editor from 'features/editor/Editor'
import React, { useState } from 'react'
import {
    useForm,
    useController,
    useFieldArray,
    useWatch,
} from 'react-hook-form'
// import EditBlock from './EditBlock'

const fieldArrayName = 'projects'

function BasicForm({
    fields,
    control,
    handleSubmit,
    register,
    openProjectIndex,
    setValue,
    append,
}) {
    const onSubmit = (data) => console.log('data, data', data)

    console.log('fields', fields)
    console.log('openProjectIndex', openProjectIndex)
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((project, index) => {
                    return (
                        <Editor
                            active={openProjectIndex === index}
                            control={control}
                            index={index}
                            key={project.id}
                            register={register}
                        />
                    )
                })}

                <input type="submit" />
            </form>
            <h3>Set active file</h3>
            <div>
                <button
                    onClick={() =>
                        setValue(
                            `projects[${openProjectIndex}].activeFile`,
                            'html'
                        )
                    }
                >
                    html
                </button>
                <button
                    onClick={() =>
                        setValue(
                            `projects[${openProjectIndex}].activeFile`,
                            'css'
                        )
                    }
                >
                    css
                </button>
                <button
                    onClick={() =>
                        setValue(
                            `projects[${openProjectIndex}].activeFile`,
                            'js'
                        )
                    }
                >
                    js
                </button>
            </div>
        </>
    )
}
export default BasicForm

// {fields.map((field, index) => {
//     console.log('field', field)
//     return (
//         <fieldset key={field.id}>
//             <EditBlock
//                 control={control}
//                 update={update}
//                 index={index}
//                 replace={replace}
//                 value={field}
//             />
//         </fieldset>
//     )
// })}
// <button
//     type="button"
//     onClick={() => {
//         append({
//             activeFile: 'html',
//             customBlock: {
//                 html: '<div>block</div>',
//                 css: 'body {color: red}',
//                 js: `const foo = "bar"`,
//                 title: 'Custom block',
//             },
//         })
//     }}
// >
//     append
// </button>

// const { fields, append, update, replace } = useFieldArray({
//     control,
//     name: fieldArrayName,
//     defaultValues: {
//         [fieldArrayName]: [],
//     },
//     // defaultValues: {
//     //     projects: [
//     //         {
//     //             html: '<div>block 1</div>',
//     //             css: 'body {color: red}',
//     //             js: `const foo = "bar"`,
//     //             title: 'Custom block 1',
//     //         },
//     //         {
//     //             html: '<div>block 2</div>',
//     //             css: 'body {color: blue}',
//     //             js: `const bar = "foo"`,
//     //             title: 'Custom block 2',
//     //         },
//     //     ],
//     // },
// })
