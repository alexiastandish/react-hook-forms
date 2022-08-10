const shapeForForm = (block) => {
    const shapedBlock = {
        fonts: [],
        libraries: [],
        html: block.html,
        css: block.css,
        js: block.js,
        id: block.id,
        title: block.title,
        variables: JSON.stringify(block.variables),
    }

    block.resources.map((resource) => {
        if (resource.type === 'font') {
            shapedBlock.fonts.push(resource.url)
        }
        shapedBlock.libraries.push({
            label: resource.label,
            type: resource.type,
            value: resource.url,
        })
    })

    return block
}

export default shapeForForm
