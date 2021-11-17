import * as React from 'react'

const MyImageTag = ({ children, ...props }) => {
    return (
        <img {...props} style={{ width: 400 }} />
    )
}

export default MyImageTag;