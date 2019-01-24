import Taro, { Component } from '@tarojs/taro'
import { AtForm, AtInput, AtTextarea, AtButton, AtList, AtListItem, AtCalendar } from "taro-ui"
import { View, Text, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'


import './task.scss'


@connect(({ cList, task }) => {
  console.log(cList)
  return {
    cList, task
  }
})
class TaskForm extends Component {

  config = {
    navigationBarTitleText: '添加任务'
  }
  constructor() {
    super(...arguments)
    this.state = {
      planFinished: '12:01',
    }
  }
  handleNameChange(value) {
    this.setState('name', value)
  }
  handleeomoChange(value) {
    this.setState('memo', value)
  }
  onSubmit(event) {
    console.log(event)
    console.log(this.state.value)
  }
  onReset(event) {
    console.log(event)
    this.setState('name', '')
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    // this.props.dispatch(getList({ whereSql: '', page: 0, size: 999 },'task'))
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onTimeChange = e => {
    this.setState({
      planFinished: e.detail.value
    })
  }
  handleDateClick(value){
      console.log(value.value)
    this.setState('taskDate',value.value)
  }
  render() {
    // let content=this.props.cList.content
    return (
      <View className='page'>
     || {this.state.taskDate}||
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name='taskDate'
            title='日期'
            type='text'
            placeholder='日期'
            value={this.state.taskDate}
            onChange={this.handleNameChange.bind(this)}
          />
          <AtCalendar isVertical onDayClick={this.handleDateClick.bind(this)} />
          <AtInput
            name='name'
            /* title='名称' */
            type='text'
            placeholder='任务名称'
            value={this.state.name}
            onChange={this.handleNameChange.bind(this)}
          />

          <AtTextarea
            name='memo'
            /*  title='内容' */
            type='text'
            placeholder='任务内容'
            value={this.state.memo}
            onChange={this.handleMemoChange.bind(this)}
          />
          {/*  <AtInput
            name='planFinished'
            title='预期完成'
            type='text'
            placeholder='预期完成时间'
            value={this.state.name}
            onChange={this.handleNameChange.bind(this)}
          /> */}




          <Picker mode='time' value={this.state.planFinished} onChange={this.handleTimeChange.bind(this)}>
            <AtListItem title='预期完成时间' extraText={this.state.planFinished} />
          </Picker>



          {/*   <View className='atInput atinput'>
            <View className='at-input__title' fro='planFinished'>
              <Picker mode='time' name='planFinished' onChange={this.onTimeChange}
                className='at-input__title at-input__title' >
                预期完成{'             '}{this.state.planFinished}

              </Picker></View>
          </View> */}
          <AtInput
            name='planDuration'
            /* title='计划时长' */
            type='number'
            placeholder='预期用时(分)'
            value={this.state.name}
            onChange={this.handleNameChange.bind(this)}
          />

          <AtButton formType='submit'>提交</AtButton>
          <AtButton formType='reset'>重置</AtButton>
        </AtForm>
      </View >
    )
  }
}

export default TaskForm
