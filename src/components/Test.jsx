import React from 'react'
import { useForm, useFieldArray, useController } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

function Test(props) {
    // const fieldArrayName = 'projects'
    const { control, handleSubmit } = useForm({
        method: 'onChange',
    })
    const { fields, append, update, remove } = useFieldArray({
        control,
        name: 'projects',
        defaultValues: {
            projects: [],
        },
    })
    console.log('fileds', fields)
    const onSubmit = (data) => console.log(data)
    return (
        <div>
            <DevTool control={control} placement="top-right" />
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                    <fieldset key={field.id}>
                        <Edit
                            control={control}
                            update={update}
                            index={index}
                            value={field}
                        />
                        <button
                            className="remove"
                            type="button"
                            onClick={() => remove(index)}
                        >
                            Remove
                        </button>
                    </fieldset>
                ))}

                <br />

                <button
                    type="button"
                    onClick={() => {
                        append({
                            firstName: '',
                            lastName: '',
                            working: false,
                        })
                    }}
                >
                    append
                </button>
                <input type="submit" />
            </form>
        </div>
    )
}
export default Test

const Edit = ({ update, index, value, control }) => {
    console.log('value', value)
    const { register, handleSubmit } = useForm({
        defaultValues: value,
    })
    const {
        formState: { isDirty, dirtyFields },
    } = useController({
        control,
        name: `projects.${index}`,
    })

    console.log('dirtyFields', dirtyFields)
    console.log('isDirty', isDirty)
    return (
        <div>
            {/* <Display control={control} index={index} /> */}

            <input
                placeholder="first name"
                {...register(`projects.${index}.firstName`, { required: true })}
            />
            <input
                placeholder="last name"
                {...register(`lastName`, { required: true })}
            />
            <label>
                Are you working?
                <input type="checkbox" {...register(`working`)} />
            </label>

            <button
                type="button"
                onClick={handleSubmit((data) => {
                    update(index, data)
                })}
            >
                Submit
            </button>
        </div>
    )
}
