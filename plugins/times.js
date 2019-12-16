import Vue from 'vue'

Vue.use({
    install(vue) {
        /**
         * @returns {String}
         */
        vue.prototype.$times = function ({
            time,
            format,
            timezone
        }) {
            /**
 * types
 * Y - год
 * MM - месяц
 * D - день
 * H - час
 * M - минуты
 * S - секунды
 *
 * использование только внутри фигурных скобок {ТИП}
 */
            if (typeof time !== 'string')
                throw Error('variable time only string date')

            if (timezone)
                time = new Date(Date.parse(time)).toLocaleString('ru-RU', {
                    timeZone: timezone
                })

            const prepare = {
                Y: timezone ? time.substr(6, 4) : time.substr(0, 4),
                MM: timezone ? time.substr(3, 2) : time.substr(5, 2),
                D: timezone ? time.substr(0, 2) : time.substr(8, 2),
                H: timezone ? time.substr(12, 2) : time.substr(11, 2),
                M: timezone ? time.substr(15, 2) : time.substr(14, 2),
                S: timezone ? time.substr(18, 2) : time.substr(17, 2)
            }


            Object.keys(prepare).forEach(resolve => {
                format = format.replace(`{${resolve}}`,
                    prepare[resolve])
            })

            return format.toString()
        }
    }
})
