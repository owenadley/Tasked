import React from 'react';
import { CheckBox } from 'react-native-elements';
import { View } from 'react-native';

class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }

    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks = () => {
        fetch(`http://localhost:5000/tasks/?idusers=1`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({tasks: responseJson.tasks})
        })
        .catch((error) => {
          console.log(error); 
        })
    }

    getCheckedTask = (id) => {
        return Boolean(this.state.tasks[id-1].completed);
    }
    
    toggleCheckbox = (id) => {
/*          let isComplete = this.state.tasks[id-1].completed;

        this.setState(prevState => ({
            tasks: prevState.tasks.map(
            task => task.idusers === id-1 ? {...task, complete: !isComplete} : task
            )
        }))  */
    } 

    render() {
        console.log(this.props.tasks)
        return (
            this.state.tasks.map((task) => {
            return (
         
                    <CheckBox 
                        center 
                        key={task.idtasks} 
                        title={task.title} 
                        checked={this.getCheckedTask(task.idtasks)} 
                        onPress={() => this.toggleCheckbox(task.idtasks)}  
                    />
         
                )
            })
        )

    }

}

export default TaskList;