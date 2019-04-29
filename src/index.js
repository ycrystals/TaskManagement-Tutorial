import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";

import AddTask from "./Components/addTask";
import Features from "./Components/Features/Features";
import TableData from "./Components/Table/tableData";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      isCollapsed: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1
      },
      keyword: "",
      sortBy: "",
      sortValue: 1
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onEnableAddTask = this.onEnableAddTask.bind(this);
    this.onCloseAddItem = this.onCloseAddItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUpdateStatus = this.onUpdateStatus.bind(this);
    this.findItem = this.findItem.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEnableEditTask = this.onEnableEditTask.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  onEnableAddTask() {
    if (this.state.isCollapsed && this.state.taskEditing !== null) {
      this.setState({
        isCollapsed: true,
        taskEditing: null
      });
    } else {
      this.setState({
        isCollapsed: !this.state.isCollapsed,
        taskEditing: null
      });
    }
  }

  onAddItem() {
    var tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  onCloseAddItem() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks
      });
    }
  }

  onSubmit(data) {
    var { tasks } = this.state;
    if (data.id === "") {
      data.id = Math.random().toString(16);
      var tasks = tasks.concat(data);
    } else {
      var index = this.findItem(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  onUpdateStatus(id) {
    var index = this.findItem(id);
    var { tasks } = this.state;
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  findItem(id) {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onDelete(id) {
    var index = this.findItem(id);
    var { tasks } = this.state;
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    this.onCloseAddItem();
  }

  onEnableEditTask() {
    this.setState({
      isCollapsed: true
    });
  }

  onEdit(id) {
    var index = this.findItem(id);
    var { tasks } = this.state;
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });

    this.onEnableEditTask();
  }

  onFilter(filterName, filterStatus) {
    filterStatus = parseInt(filterStatus);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  }

  onSearch(keyword) {
    this.setState({
      keyword: keyword
    });
  }

  onSort(sortBy, sortValue) {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    });
    console.log(sortBy, sortValue);
  }

  render() {
    var {
      tasks,
      isCollapsed,
      taskEditing,
      filter,
      keyword,
      sortBy,
      sortValue
    } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      } else {
        tasks = tasks.filter(task => {
          if (filter.status === -1) {
            return task;
          } else {
            return task.status === (filter.status === 1 ? true : false);
          }
        });
      }
    }

    if (keyword) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    if (sortBy === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sortValue;
        else if (a.status < b.status) return sortValue;
        else return 0;
      });
    }

    var elmAddTask = isCollapsed ? (
      <AddTask
        onCloseAddItem={this.onCloseAddItem}
        onSubmit={this.onSubmit}
        task={taskEditing}
      />
    ) : (
      ""
    );

    return (
      <div className="container">
        <div className="text-center mb-4">
          <h1>Task Management</h1>
          <hr />
        </div>
        <div className="row">
          {/* Add active */}
          <div className="col-4 col-sm-4 col-md-4 col-lg-4">{elmAddTask}</div>

          {/* End */}
          <div
            className={
              isCollapsed
                ? "col-8 col-sm-8 col-md-8 col-lg-8"
                : "col-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onEnableAddTask}
            >
              {/*onClick={this.onAddItem} */}
              <span className="fa fa-plus mr-2" />
              Add active
            </button>
            {/* Search and Sort */}
            <Features
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />

            {/* End */}

            {/*table data */}
            <div className="row mt-3">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <TableData
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
            {/* End */}
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
