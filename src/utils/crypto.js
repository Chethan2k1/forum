// util function to create SHA256 of str using in signin and signup

import { createHash } from 'crypto'

const SHA265 = (str) => {
    return createHash('sha256').update(str).digest('hex')
}

export default SHA265
