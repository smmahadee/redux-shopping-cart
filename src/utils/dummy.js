import React from "react";

class App extends React.Component {
    newTaskRef = React.createRef();
  
    state = {
      tasks: [
        { body: "Go to the Store.", completed: true, hidden: false },
        { body: "Buy some Clothes.", completed: false, hidden: false },
        { body: "Eat some Foods.", completed: false, hidden: false },
        { body: "Return Home.", completed: false, hidden: false }
      ]
    };
  
    addNewTask = task => {
      // get a copy of current state
      const tasks = [...this.state.tasks];
      // add the item to variable
      tasks.push(task);
      // update state
      this.setState({ tasks });
    };
  
    updateFish = (index, completed) => {
      // get a copy of current state
      const tasks = [...this.state.tasks];
      // add the item to variable
      tasks[index].completed = completed;
      // update state
      this.setState({ tasks });
    };
  
    hideCompleted = hide => {
      // get a copy of current state
      const tasks = [...this.state.tasks];
      // add the item to variable
      const nTasks = hide
        ? tasks.map(task => (task.completed ? { ...task, hidden: hide } : task))
        : tasks.map(task => ({ ...task, hidden: hide }));
  
      // update state
      this.setState({ tasks: nTasks });
    };
  
    deleteTask = index => {
      // get a copy of current state
      const tasks = [...this.state.tasks];
      // add the item to variable
      tasks.splice(index, 1);
      // update state
      this.setState({ tasks });
    };
  
    render() {
      return (
        <React.Fragment>
          <Header
            appTitle="To-Do List"
            tasks={this.state.tasks}
            addNewTask={this.addNewTask}
            hideCompleted={this.hideCompleted}
          />
          <Task
            tasks={this.state.tasks}
            updateFish={this.updateFish}
            deleteTask={this.deleteTask}
          />
          <div className="footer">
            <p>
              Made with <span>❤</span> by
              <a href="http://rejaulkarim"> Rejaul Karim</a>
            </p>
          </div>
        </React.Fragment>
      );
    }
  }
  class Header extends React.Component {
    handleHide = e => {
      const hide = e.currentTarget.checked;
      this.props.hideCompleted(hide);
    };
  
    render() {
      const remaining = this.props.tasks.filter(task => !task.completed).length;
  
      return (
        <header className="title-section">
          <div id="topBar">
            <h2>
              {this.props.appTitle}{" "}
              {remaining ? <span>({remaining})</span> : null}
            </h2>
            <span>
              <input
                type="checkbox"
                name="hideComplete"
                onChange={this.handleHide}
              />{" "}
              Hide Completed Tasks
            </span>
          </div>
          <AddNewTask addNewTask={this.props.addNewTask} />
        </header>
      );
    }
  }
  class AddNewTask extends React.Component {
    newTaskRef = React.createRef();
  
    addTask = e => {
      // prevent submitting
      e.preventDefault();
      //get from Data
      const task = this.newTaskRef.value.value;
      // add task to state
      this.props.addNewTask({ body: task, completed: false });
      // refresh the form
      e.currentTarget.reset();
    };
  
    render() {
      return (
        <form onSubmit={this.addTask}>
          <input
            type="text"
            name="addNewTask"
            ref={this.newTaskRef}
            placeholder="Type to add new tasks"
          />
        </form>
      );
    }
  }
  class Task extends React.Component {
    toggleComplete = i => {
      const completed = !this.props.tasks[i].completed;
      this.props.updateFish(i, completed);
    };
  
    handleInputChange = e => {
      // const target = event.target;
      // const value = target.type === "checkbox" ? target.checked : target.value;
      // const name = target.name;
      this.props.updateFish(e.currentTarget.name, e.currentTarget.checked);
    };
  
    render() {
      const tasks = this.props.tasks;
      return (
        <ul>
          {tasks.length ? (
            tasks.filter(task => !task.hidden).map((task, i) => (
              <li key={i} className={task.completed ? "completed" : null}>
                <span>
                  <input
                    type="checkbox"
                    name={i}
                    id="completed"
                    checked={task.completed}
                    onChange={this.handleInputChange}
                  />
                </span>
                <span className="body" onClick={() => this.toggleComplete(i)}>
                  {task.body}
                </span>
                <span
                  className="deleteTask"
                  onClick={() => this.props.deleteTask(i)}
                >
                  &#10006;
                </span>
              </li>
            ))
          ) : (
            <div id="noTask">
              <p>No Task For Today!</p>
            </div>
          )}
        </ul>
      );
    }
  }
  
  ReactDOM.render(<App />, document.querySelector("#root"));
  