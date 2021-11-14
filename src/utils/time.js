import moment from 'moment';

const getTime = (timestamp) => {
    return moment.utc(timestamp).fromNow()
}

export default getTime;