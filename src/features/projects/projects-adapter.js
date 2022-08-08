import { createEntityAdapter } from '@reduxjs/toolkit'

/* projectsAdapter utilized createEntityAdapter in order to manage normalized data in the stored
 * createEntityAdapter generates prebuilt reducers and selectors for performing CRUD operations on a normalized data structure
 */

const projectsAdapter = createEntityAdapter({
    selectId: (block) => block.id,
    sortComparer: (a, b) => {
        if (a.index < b.index) {
            return -1
        }
        if (a.index > b.index) {
            return 1
        }
        return 0
    },
})

export default projectsAdapter
