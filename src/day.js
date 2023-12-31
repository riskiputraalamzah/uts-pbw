import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin
import 'dayjs/locale/id'
dayjs.extend(relativeTime)
dayjs.extend(timezone)

dayjs.tz.setDefault('Asia/Jakarta')
dayjs.locale('id')

export default dayjs
