// converted timestamp in UTC time to twitter time according to the local time

import moment from 'moment';

const getTime = (timestamp) => {
    return moment.utc(timestamp).fromNow()
}

export default getTime;