import Request from '../../utils/request'

export const getList = data => Request({
    url: '/task/getByPage',
    method: 'POST',
    data
})
export const save = data => Request({
    url: '/task/save',
    method: 'POST',
    data
})
//根据返回
export const fillForm = (json) => (
    {
        type: 'FILL_FORM',
        data: json
    })