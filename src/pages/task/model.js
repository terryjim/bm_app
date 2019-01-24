import * as taskApi from './service';
//import * as commonApi from '../../actions/common'

export default {
    namespace: 'task',
    state: {
        taskList: [],
        page: 0,
    },

    effects: {
        * getList(_, { call, put, select }) {
            const { page, taskList } = yield select(state => state.task);
            const { code,data} = yield call(taskApi.getList, {
                page,
                size: 15,
            });
            console.log("--------------------------------------")
            console.log(code)
            console.log(data)
            if (code === 0) {
                yield put({
                    type: 'save',
                    payload: {
                        taskList: page > 0 ? [...taskList, ...data.content] : data.content,
                    }
                });
            }
        },
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },

};
