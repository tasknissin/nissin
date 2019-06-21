import http from '../utils/http'
import API from '../api'
import API_Tack from '../api/rwfk_index.js'

export function getTaskupdata(getdata) {
    return new Promise((resolve, reject) => {
        http({
                url: API_Tack.taskFk_API,
                method: 'post',
                data: getdata
            })
            .then(({ data, status }) => {
                resolve(data);

            }).catch(error => {
                console.log(error);
            })
    })
}