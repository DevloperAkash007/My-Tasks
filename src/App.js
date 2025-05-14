import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    tasksList: [],
    taskName: '',
    selectTag: tagsList[0].optionId,
    activeTag: '',
  }

  submitForm = event => {
    event.preventDefault()
    const {taskName, selectTag} = this.state
    const task = {
      id: uuidv4(),
      task: taskName,
      tag: selectTag,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, task],
      taskName: '',
      selectTag: tagsList[0].optionId,
    }))
  }

  changeInput = event => {
    this.setState({taskName: event.target.value})
  }

  selectTag = event => {
    this.setState({selectTag: event.target.value})
  }

  renderTasks = () => {
    const {tasksList, activeTag} = this.state
    const filteredTasksList =
      activeTag === ''
        ? tasksList
        : tasksList.filter(each => each.tag === activeTag)

    if (filteredTasksList.length === 0) {
      return (
        <div className="no-task-view">
          <p>No Tasks Added Yet</p>
        </div>
      )
    }

    return (
      <ul className="tasks-list">
        {filteredTasksList.map(each => (
          <li key={each.id} className="list">
            <p className="taskName">{each.task}</p>
            <p className="tag-btn">{each.tag.toLocaleLowerCase()}</p>
          </li>
        ))}
      </ul>
    )
  }

  changeActiveTag = event => {
    this.setState(prevState => {
      if (prevState.activeTag === event.target.value) {
        return {
          activeTag: '',
        }
      }
      return {
        activeTag: event.target.value,
      }
    })
  }

  renderMainContainer = () => {
    const {activeTag} = this.state
    return (
      <div className="container2">
        <h1 className="tag-name">Tags</h1>
        <ul className="tags-list">
          {tagsList.map(each => (
            <li key={each.optionId}>
              <button
                type="button"
                className={
                  activeTag === each.optionId ? 'tag activetag' : 'tag'
                }
                onClick={this.changeActiveTag}
                value={each.optionId}
              >
                <p>{each.displayText}</p>
              </button>
            </li>
          ))}
        </ul>
        <h1 className="tag-name">Tasks</h1>
        {this.renderTasks()}
      </div>
    )
  }

  render() {
    const {taskName, selectTag} = this.state
    return (
      <div className="app-container">
        <div className="main-container1">
          <form onSubmit={this.submitForm} className="form-container">
            <h1 className="heading">Create a task</h1>
            <div className="input-container">
              <label htmlFor="task" className="label">
                Task
              </label>
              <br />
              <input
                placeholder="Enter the task here"
                id="task"
                className="input"
                onChange={this.changeInput}
                value={taskName}
              />
            </div>
            <div className="input-container">
              <label htmlFor="tags" className="label">
                Tags
              </label>
              <br />
              <select
                id="tags"
                className="input"
                onChange={this.selectTag}
                value={selectTag}
              >
                {tagsList.map(each => (
                  <option
                    key={each.optionId}
                    id={each.optionId}
                    value={each.optionId}
                  >
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button type="submit" className="add-btn">
                Add Task
              </button>
            </div>
          </form>
        </div>
        {this.renderMainContainer()}
      </div>
    )
  }
}

export default App
