import React from 'react'
import { useController, useWatch } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectActiveFile } from './editor-selectors'

const Editor = ({ control, index, register }) => {
    const activeFile = useSelector(selectActiveFile)
    const { field } = useController({
        control,
        name: `projects[${index}]`,
    })
    const value = useWatch({
        control,
        name: `projects[${index}]`,
    })

    return (
        <div>
            <h3>{value?.title}</h3>

            <input
                name={`projects[${index}].title`}
                {...register(`projects[${index}].title`)}
            />
            <input
                name={`projects[${index}].[${activeFile}]`}
                {...register(`projects[${index}].[${activeFile}]`)}
            />

            {activeFile}
        </div>
    )
}

export default Editor
