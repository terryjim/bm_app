import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import models from './models'
import dva from './utils/dva'
import './styles/base.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();
class App extends Component {
  config = {
    pages: [
      'pages/task/index',
      'pages/index/index',      
      'pages/task/taskForm'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '行为管理',
      navigationBarTextStyle: 'black' 
    },
    tabBar: {
      color: '#333',
      selectedColor: '#dc0032',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [
         {
          pagePath: 'pages/task/index',
          text: '任务',
          iconPath: 'assets/images/view.png',
          selectedIconPath: 'assets/images/view-red.png'
        },{
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: 'assets/images/view.png',
          selectedIconPath: 'assets/images/view-red.png'
        },
      ]
    }
  }
  componentWillMount() { }
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }
  componentDidNotFound() { }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
