import Taro from '@tarojs/taro';
import * as taskApi from './service';
//import * as commonApi from '../../actions/common'

export default {
    namespace: 'task',
    state: {
        taskList: [],
        page: 0,
    },

    effects: {
        * getList({payload}, { call, put, select }) {
            //yeild select作用和 redux thunk 中的 getState 相同
            const { page, taskList } = yield select(state => state.task);
            const { code, data } = yield call(taskApi.getList, {
                page,
                size: 10,
                ...payload
            });
            console.log("--------------------------------------")
            console.log(code)
            console.log(data)
            if (code === 0) {
                //yeild put作用和 redux 中的 dispatch 相同
                yield put({
                    type: 'update',
                    payload: {
                        //往后翻页时前面数据依然保留
                        taskList: page > 0 ? [...taskList, ...data.content] : data.content,
                    }
                });
            }
        },
        * save({ payload }, { call }) {
            console.log(payload)
            const { code, data } = yield call(taskApi.save, payload)

            if (code === 0) {
                Taro.showToast({
                    title: '保存成功',
                    icon: 'none',
                });
                setTimeout(() => {
                    Taro.navigateBack();
                }, 1000);
            } else {
                Taro.showToast({
                    title: '保存失败' + data,
                    icon: 'none',
                });
            }
        },
    },

    reducers: {
        update(state, { payload }) {
            console.log('ttttttttttttttttttttttttt',payload)
            return { ...state, ...payload };
        },
    },

};
