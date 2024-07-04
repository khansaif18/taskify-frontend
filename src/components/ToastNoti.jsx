import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function ToastNoti() {
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    className: '',
                    style: {
                        border: '1px solid #cccccc27',
                        color: '#ccc',
                        padding: '9px 14px',
                        backgroundColor: '#7257fa'
                    },
                }}
            />
        </>
    )
}
