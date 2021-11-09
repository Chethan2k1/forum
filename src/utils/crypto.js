import { createHash } from 'crypto'

const SHA265 = (str) => {
    return createHash('sha256').update(str).digest('hex')
}

export default SHA265
