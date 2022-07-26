import Editor from 'features/editor/Editor'
import React, { useEffect } from 'react'
import { useController } from 'react-hook-form'

function Projects({
    fields,
    control,
    handleSubmit,
    register,
    openProjectIndex,
}) {
    const activeForm = fields[openProjectIndex]

    useEffect(() => {
        window.onpopstate = function () {
            window.history.pushState(null, '', window.location.href)
        }
        window.history.pushState(null, '', window.location.href)
        // setAlert({ type: 'unsaved', active: true })
    }, [window])

    return (
        <>
            {activeForm && (
                <Editor
                    fields={fields[openProjectIndex]}
                    control={control}
                    register={register}
                    key={activeForm.id}
                    index={openProjectIndex}
                />
            )}
        </>
    )
}
export default Projects
