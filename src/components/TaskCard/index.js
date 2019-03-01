import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';
import { AtCard, AtProgress } from 'taro-ui'
import './index.scss';


class TaskCard extends Component {
    static propTypes = {
        clothing: PropTypes.array,
        deleteClothing: PropTypes.func,
    }

    static defaultProps = {
        clothing: [],
        task:{planDuration: 100.0,
        duration: 0.0,
        planFinished: ''},
        deleteClothing: function () {

        },
    };

    render() {
        const { id, name, planFinished, planDuration, started, taskDate, duration } = this.props.task;

        return (
            <View className='doc-body'>
                <View className='panel' >
                    <View className='panel__content no-padding'>
                        <View className='example-item'>
                            <AtCard title={name} onClick={this.handleClick}  style={{'color':'red'}}>
                                <AtProgress percent={(duration / planDuration) * 100.0} strokeWidth={10} color='#13CE66' status='warn' />
                                <View  style={{'background':'red'}}>计划完成：{planFinished}</View>
{duration / planDuration}
                            </AtCard>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default TaskCard;
