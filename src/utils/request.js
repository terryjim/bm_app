import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '../config';

const request_data = {
    platform: 'wap',
    rent_mode: 2,
};

export default (options = { method: 'GET', data: {} }) => {
    if (!noConsole) {
        console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`);
    }
    console.log("url-------------:",baseUrl+options.url)
    return Taro.request({
        url: baseUrl + options.url,
        data: {
            ...request_data,
            ...options.data
        },
        header: {
            'Content-Type': 'application/json',
        },
        method: options.method.toUpperCase(),
    }).then((res) => {
        console.log("##########################################333")
        console.log(res)
        const { statusCode, data } = res;
        if (statusCode >= 200 && statusCode < 300) {
            if (!noConsole) {
                console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`, res.data);
            }
            if (data.code !== 0) {
                Taro.showToast({
                    title: `${res.data.msg}~` || res.data.data,
                    icon: 'none',
                    mask: true,
                });
            }
            console.log("data---",data)
            return data;
        } else {
            throw new Error(`网络请求错误，状态码${statusCode}`);
        }
    })
}
