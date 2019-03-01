import Taro, { Component } from '@tarojs/taro'
import { AtList, AtListItem, AtProgress, AtIcon } from "taro-ui"
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import TaskCard from '../../components/TaskCard'
import './task.scss'
import { getFormatDate } from '../../utils/date'

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
    this.props.dispatch({ type: 'task/getList',payload:{'whereSql':`and taskDate='${getFormatDate(new Date())}'`} })
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
      type: 'task/update',
      payload: {
        page: this.props.page + 1,
      },
    });
    this.props.dispatch({
      type: 'task/getList',
    });
  }
  /*  onPullDownRefresh(){
     this.props.dispatch({
       type: 'task/update',
       payload: {
         page: 0,
       },
     });
     this.props.dispatch({
       type: 'task/getList',
     });
   } */
  render() {

    console.log("this.props.taskList:", this.props.taskList)
    let { taskList } = this.props
    return (
      <View className='index'>
        <AtProgress percent={75} strokeWidth={10} color='#13CE66' status='success' />
        <AtList /* className='atlist' */>
          {
            taskList != undefined ?
              taskList.map(c =>
                <AtListItem key={c.id} title={c.name} extraText={'' + c.planFinished} />
              ) : ''
          }

        </AtList>
        <AtListItem title='已完成任务' />
        <View  >
          <AtIcon className='circle-float' onClick={this.onEditTask.bind(this)} value='add-circle' size='60' color='#13CE66'     >
          </AtIcon>
        </View>
        <View className='panel'>

          <View className='panel__content'>
            <View className='example-item'>
              <View className='at-row'>
                <View className='at-col'> <TaskCard /> </View>
                <View className='at-col'> <TaskCard /> </View>
              </View>
            </View>
          </View>
        </View>
        <View className='panel'>
          <View className='panel__title'>超出换行</View>
          <View className='panel__content'>
            <View className='example-item'>
              <View className='at-row at-row--wrap'>
              {
            taskList != undefined ?
              taskList.map(c =>
                <View key={c.id} className='at-col at-col-12' style={{'paddingBottom':'5px'}}><TaskCard task={{...c}} /></View>
               
              ) : ''
          }
               {/*  <View className='at-col at-col-6' style={{'paddingBottom':'5px'}}><TaskCard /></View>
                <View className='at-col at-col-6'><TaskCard /></View>
                <View className='at-col at-col-6'><TaskCard /></View>
                <View className='at-col at-col-6'><TaskCard /></View>
                <View className='at-col at-col-6'><TaskCard /></View>
                <View className='at-col at-col-6'><TaskCard /></View>
                <View className='at-col at-col-6'><TaskCard /></View>
                <View className='at-col at-col-6'><TaskCard /></View>
                <View className='at-col at-col-6'><TaskCard /></View> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default Task
