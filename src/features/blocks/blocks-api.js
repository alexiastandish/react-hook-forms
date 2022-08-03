import { v4 as uuidv4 } from 'uuid'

export const getAllBlocks = async () => {
    const response = await fetch('http://localhost:4000/customBlocks')
    return response.json()
}

export const saveNewBlock = async (block) => {
    const backendId = uuidv4()
    const response = await fetch('http://localhost:4000/customBlocks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...block, id: backendId }),
    })
    return response.json()
}

export const updateCustomBlock = async (block) => {
    const customBlockResponse = await fetch(
        `http://localhost:4000/customBlocks/${block.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(block),
        }
    )

    return customBlockResponse.json()
}
