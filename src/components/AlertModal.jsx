import React from 'react'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

function AlertModal({ open, setAlert, header, subtext, actions }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    return (
        <Modal
            open={open}
            onClose={() => setAlert({ active: false, type: null })}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {header}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {subtext}
                </Typography>
                {actions.map((action) => {
                    return <Button>{action.label}</Button>
                })}
            </Box>
        </Modal>
    )
}
export default AlertModal
