// import getOrganizedResources from "utils/get-organized-resources"

import {
    projectAddOne,
    setOpenProjectId,
} from 'features/projects/projects-slice'
import getDefaultBlock from 'utils/default-block'
import shapeForForm from 'utils/shape-for-form'
import { v4 as uuidv4 } from 'uuid'
// ONLY GETS CALLED WHEN WE ARE ROUTING

const resetOptions = {
    keepDirty: true,
    keepTouched: true,
    keepError: true,
}

const addProjectAndField =
    ({ customBlockId, resetField, register, setValue }) =>
    async (dispatch, getState) => {
        const { blocks } = getState()
        console.log('customBlockId', customBlockId)
        console.log('blocks.entities', blocks.entities)

        // IF CUSTOM BLOCK ID IS NULL, CREATE A NEW PROJECT WITH DEFAULT VALUES
        if (!customBlockId) {
            const id = uuidv4()
            const newProject = {
                activeFile: 'html',
                id,
                customBlockId: null,
            }
            dispatch(projectAddOne(newProject))
            register(`projectForms.${id}`)
            resetField(`projectForms.${id}}`, {
                ...resetOptions,
                defaultValue: getDefaultBlock(),
            })
            setValue(`projectForms.${id}`, getDefaultBlock())
            return dispatch(setOpenProjectId(id))
        }

        // IF NOT NULL, FIND FROM THE BLOCK ENTITIES
        const shapedBlock = shapeForForm(blocks.entities[customBlockId])

        const newProject = {
            activeFile: 'html',
            id: customBlockId,
            customBlockId: customBlockId,
        }

        dispatch(projectAddOne(newProject))
        register(`projectForms.${customBlockId}`)
        resetField(`projectForms.${customBlockId}}`, {
            ...resetOptions,
            defaultValue: shapedBlock,
        })
        setValue(`projectForms.${customBlockId}`, shapedBlock)
        return dispatch(setOpenProjectId(customBlockId))

        // // SHAPE BLOCK
        // if (projects.ids.includes(id)) {
        //     // console.log('hi')
        //     // // console.log('HERE', values?.projects?.[id])
        //     // // // console.log('PROJECT IS OPEN')
        //     // return resetField(`projects.${id}`, {
        //     //     defaultValue: { ...values[id] },
        //     //     keepDirty: true,
        //     //     keepTouched: true,
        //     //     keepError: true,
        //     // })
        // }
        // if (blocks.ids.includes(id)) {
        //     // console.log('BLOCK EXISTS')

        //     const blockShapedAsProject = blocks.entities[id]
        //     // console.log('blockShapedAsProject', blockShapedAsProject)
        //     await dispatch(projectAddOne({ id, activeFile: 'html' }))
        //     return resetField(`projects.${id}`, {
        //         defaultValue: blockShapedAsProject,
        //         keepDirty: true,
        //         keepTouched: true,
        //         keepError: true,
        //     })
        // } else {
        //     // console.log('BRAND NEW BLOCK/PROJECT')
        //     const brandNewBlock = {
        //         fonts: [],
        //         title: '',
        //         html: '',
        //         css: '',
        //         js: '',
        //         // fonts: [],
        //         // html: '<h1>Hello </h1>',
        //         // css: 'body { color: red }',
        //         // js: "const foo = 'bar'",
        //         // id,
        //         // key: id,
        //         // metadata: { isTest: false },
        //         // mobileBlockContexts: [],
        //         // previewImageUrl:
        //         //     'https://storage.googleapis.com/tapcart-hacks-assets/Screen%20Shot%202022-06-10%20at%2011.09.53%20AM.png',
        //         // resources: [],
        //         // slugHash: id,
        //         // status: 'Draft',
        //         // title: 'new custom block',
        //         // type: 'custom',
        //         // urls: { html: 'BiEYnhhzLR/sc7ReMrxeIUpJVR1/index.html' },
        //         // variables: [],
        //     }

        //     await dispatch(projectAddOne({ id, activeFile: 'html' }))
        //     register(`projects.${id}`)
        //     return resetField(`projects.${id}`, {
        //         defaultValue: { ...brandNewBlock },
        //         keepDirty: true,
        //         keepTouched: true,
        //         keepError: true,
        //     })
    }

export default addProjectAndField
