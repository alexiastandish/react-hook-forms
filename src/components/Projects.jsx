import Editor from 'features/editor/Editor'
import React from 'react'

function Projects({
    fields,
    control,
    handleSubmit,
    register,
    openProjectIndex,
    setValue,
}) {
    const onSubmit = (data) => console.log('data, data', data)
    const activeForm = fields[openProjectIndex]

    return (
        <>
            {activeForm && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Editor
                        control={control}
                        register={register}
                        key={activeForm.id}
                        index={openProjectIndex}
                    />

                    <input type="submit" />
                </form>
            )}
        </>
    )
}
export default Projects
