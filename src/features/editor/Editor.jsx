import React from 'react'
import { useController, useWatch } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectActiveFile } from './editor-selectors'

const Editor = ({ fields, control, index, register }) => {
    const activeFile = useSelector(selectActiveFile)
    const { field, fieldState, formState } = useController({
        control,
        name: `projects.${index}`,
    })
    console.log('formState', formState)

    // const activeCode = register(`projects.${index}.${activeFile}`)

    return (
        <>
            <input {...register(`projects.${index}.title`)} />
            {/* <input {...activeCode} /> */}

            {activeFile}
        </>
    )
}

export default Editor
