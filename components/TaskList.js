import React from 'react';
import { CheckBox } from 'react-native-elements';
import { View } from 'react-native';

class TaskList extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.tasks)
    }

    getCheckedTask = (id) => {
        return this.props.tasks[id].complete;
    }
    
    toggleCheckbox = (id) => {
        let isComplete = this.props.tasks[id].complete;

        this.setState(prevState => ({
            tasks: prevState.tasks.map(
            task => task.id === id ? {...task, complete: !isComplete} : task
            )
        }))
    }

    render() {
        console.log(this.props.tasks)
        return (
            this.props.tasks.map((task) => {
            return (
                <View>
                    <CheckBox 
                        center 
                        key={task.id} 
                        title={task.title} 
                        checked={this.getCheckedTask(task.id)} 
                        onPress={() => this.toggleCheckbox(task.id)}  
                    />
                </View>
            )
            })
        )

    }

}

export default TaskList;