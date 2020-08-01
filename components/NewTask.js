import React from 'react';

class NewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
        }
    }

    handleTextChange = (text) => {
        this.setState({taskName: text})
    }
    
    submitTask = () => {
        let newTask = {
            id: this.state.tasks.length,
            title: this.state.taskName,
            complete: false
        }
        this.setState({tasks: [...this.state.tasks, newTask]})
    }

    render() {

        return (

            <>
                <TextInput
                onChangeText={text => this.handleTextChange(text)}/>

                <TouchableOpacity onPress={this.submitTask}><Text>Submit</Text></TouchableOpacity>
            </>
        )

    }

}

export default NewTask;