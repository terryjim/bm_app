import Taro, { Component } from '@tarojs/taro'
import { AtList, AtListItem, AtProgress, AtIcon } from "taro-ui"
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './task.scss'


@connect(({ task, loading }) => ({
  ...task, ...loading,
}))

class Task extends Component {

  config = {
    navigationBarTitleText: '今日任务'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    this.props.dispatch({ type: 'task/getList' })
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onEditTask = (e) => {
    e.stopPropagation()
    Taro.navigateTo({ url: '/pages/task/taskForm' })
  }

  // 小程序上拉加载
  onReachBottom() {
    this.props.dispatch({
      type: 'task/save',
      payload: {
        page: this.props.page + 1,
      },
    });
    this.props.dispatch({
      type: 'task/getList',
    });
  }

  render() {

    console.log("this.props.taskList:", this.props.taskList)
   let {taskList}=this.props
    return (
      <View className='index'>
        <AtProgress percent={75} strokeWidth={10} color='#13CE66' status='success' />
       <AtList /* className='atlist' */>
          {
         taskList!=undefined?
         taskList.map(c =>
              <AtListItem key={c.id} title={c.name} extraText={'' + c.planDuration} />
            )  :''       
          }

        </AtList>
        <AtListItem title='已完成任务' />
        <View  >
          <AtIcon className='circle-float' onClick={this.onEditTask.bind(this)} value='add-circle' size='60' color='#13CE66'     >
          </AtIcon>
        </View>  
      </View>
    )
  }
}
export default Task
