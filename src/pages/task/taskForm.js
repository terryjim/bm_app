import Taro, { Component } from '@tarojs/taro'
import { AtForm, AtInput, AtTextarea, AtButton, AtList, AtListItem, AtCalendar } from "taro-ui"
import { View, Text, Picker, Label } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getFormatDate } from '../../utils/date'

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
      form: {
        taskDate: getFormatDate(new Date()),
        planFinished: '20:00'
      },
      showPickDate: false
    }
  }
  handleNameChange(value) {
    this.setState({ form: { ...this.state.form, name: value } })
   
  }
  handleDateClick(value) {
    //选择日期后隐藏日期控件
    this.setState({ form: { ...this.state.form, taskDate: value.value } })
    this.setState({ showPickDate: false })
  }
  handleClickTaskDate() {
    //点击日期时显示选择日期控件
    this.setState({ showPickDate: true })
  }
  handleMemoChange(event) {
    this.setState({ form: { ...this.state.form, memo: event.target.value } })
  }
  handlePlanFinishedChange = e => {
    this.setState({ form: { ...this.state.form, planFinished: e.detail.value } })
  }
  handlePlanDurationChange(value) {
    this.setState({ form: { ...this.state.form, planDuration: value } })
  }
  onSubmit = () => {
    
    const { name } = this.state.form;
    console.log("@@@@@@@@@@@@@@@@@@@@@@@",name)
    if (name===undefined||name === '') {
      Taro.showToast({
        title: '请输入任务名称',
        icon: 'none',
      });
      return;
    }
   /*  if (contact_name === '') {
      Taro.showToast({
        title: '请输入收货人',
        icon: 'none',
      });
      return;
    }
    if (!/^1[234578]\d{9}$/.test(contact_mobile)) {
      Taro.showToast({
        title: '手机号格式不正确',
        icon: 'none',
      });
      return;
    }
    if (showValue.region_name === '') {
      Taro.showToast({
        title: '请选择收货地址',
        icon: 'none',
      });
      return;
    }
    if (address_detail === '') {
      Taro.showToast({
        title: '请输入详细地址',
        icon: 'none',
      });
      return;
    } */
    this.props.dispatch({
      type: 'task/save',
      payload: {
        ...this.state.form,planFinished:this.state.form.taskDate+' '+this.state.form.planFinished+':00'
      },
    });
  }
  onReset(e) {
    e.stopPropagation()
/*     Taro.navigateTo({ url: '/pages/task/index' }) */
    Taro.navigateBack();
  }
  componentWillReceiveProps(nextProps) {
    console.log('----------------------------&&&&&&&&&&&&&&&&&')
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    // this.props.dispatch(getList({ whereSql: '', page: 0, size: 999 },'task'))
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }




  render() {
    // let content=this.props.cList.content
    return (
      <View className='page' >
        <View className='doc-body' style={{'padding':'10rpx'}}>
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
            onReset={this.onReset.bind(this)}
          >
            <AtInput
              editable={false}
              name='taskDate'
              title='日期'
              type='text'
              value={this.state.form.taskDate}
              onClick={this.handleClickTaskDate.bind(this)}

            />

            <View hidden={!this.state.showPickDate}>
              <AtCalendar isVertical onDayClick={this.handleDateClick.bind(this)} />
            </View>
            <AtInput
              name='name'
              title='名称'
              type='text'
              placeholder='任务名称'
              value={this.state.form.name}
              onChange={this.handleNameChange.bind(this)}
            />
            <View className='at-input at-input'>
              <Label style={{ 'font-size': '32rpx' }}>任务详情</Label>
            </View>
            <AtTextarea
              name='memo'
              title='内容'
              type='text'
              placeholder='任务内容'
              value={this.state.form.memo}
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




            <Picker mode='time' value={this.state.planFinished} onChange={this.handlePlanFinishedChange.bind(this)}>
              <AtListItem title='预计完成时间' extraText={this.state.form.planFinished} />
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
              title='计划时长(分)'
              type='number'
              /*     placeholder='预期完成(分)' */
              value={this.state.form.planDuration}
              onChange={this.handlePlanDurationChange.bind(this)}
            />

            <AtButton formType='submit'>提交</AtButton>
            <AtButton formType='reset'>取消</AtButton>
          </AtForm >
        </View >
      </View >
    )
  }
}

export default TaskForm
