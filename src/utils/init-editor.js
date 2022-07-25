import {
    addActiveProjectId,
    setOpenProjectId,
} from 'features/workspace/workspace-slice'

const initEditor = (id) => async (dispatch, getState) => {
    console.log('id', id)
    const {
        blocks,
        // workspace: { openProjectId },
    } = getState()

    const blockExists = blocks.entities[id]

    if (blockExists) {
        // When custom blocks data is fetched from the database, libraries and fonts are grouped together under resources
        // On the front end at the project entity level, libraries and fonts are delegated into 2 separate arrays
        // making it easier to add, update, remove, validate libraries/fonts without having to iterate or filter through resources
        // on every update. The function that saves a custom block to the database will merge these separated arrays before sending the block

        const blockWithOrganizedResources = {
            ...blockExists,
            fonts: [],
            resources: [],
        }
        blockExists.resources.map((resource) => {
            if (resource.type === 'font') {
                return blockWithOrganizedResources.fonts.push(resource)
            }
            return blockWithOrganizedResources.resources.push(resource)
        })

        await dispatch(addActiveProjectId(id))

        return {
            id,
            activeFile: 'html',
            customBlock: blockWithOrganizedResources,
        }
    }
    await dispatch(addActiveProjectId(id))

    return {
        id,
        activeFile: 'html',
        customBlock: {
            css: 'body { color: red }',
            fonts: [],
            html: '<h1>Hello </h1>',
            id,
            js: "const foo = 'bar'",
            metadata: { isTest: false },
            mobileBlockContexts: [],
            previewImageUrl:
                'https://storage.googleapis.com/tapcart-hacks-assets/Screen%20Shot%202022-06-10%20at%2011.09.53%20AM.png',
            resources: [],
            slugHash: id,
            status: 'Draft',
            title: '',
            type: 'custom',
            urls: { html: 'BiEYnhhzLR/sc7ReMrxeIUpJVR1/index.html' },
            variables: [],
        },
    }
}

export default initEditor
