import React from 'react'
import {
    useForm,
    useController,
    useFieldArray,
    useWatch,
} from 'react-hook-form'

const Editor = ({ control, index, register, active }) => {
    const { field } = useController({
        control,
        name: `projects[${index}]`,
    })
    const value = useWatch({
        control,
        name: `projects[${index}]`,
    })

    return (
        <div
            style={{
                border: active ? '1px solid blue' : '1px solid transparent',
            }}
        >
            <h3>
                {active && <span>ACTIVE</span>}
                {value?.customBlock?.title}
            </h3>

            <input
                name={`projects[${index}].customBlock.title`}
                {...register(`projects[${index}].customBlock.title`)}
            />
            <input
                name={field.value.activeFile}
                {...register(
                    `projects[${index}].customBlock[${value.activeFile}]`
                )}
            />

            {value.activeFile}
        </div>
    )
}

export default Editor
