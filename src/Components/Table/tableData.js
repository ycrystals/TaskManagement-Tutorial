import React, { Component } from "react";
import TaskDatas from "./TaskDatas";

export default class TableData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterName: "",
      filterStatus: -1 // all, active: 1, deactive: 0
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value
    });
  }

  render() {
    var { tasks, onUpdateStatus, onDelete, onEdit } = this.props;
    var { filterName, filterStatus } = this.state;
    var elmTasks = tasks.map((task, index) => {
      return (
        <TaskDatas
          key={task.id}
          index={index}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      );
    });

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">Ordinal</th>
            <th className="text-center">Name</th>
            <th className="text-center">Status</th>
            <th className="text-center">Select</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={filterStatus}
                onChange={this.onChange}
              >
                <option value="-1">All</option>
                <option value="0">Deactivated</option>
                <option value="1">Activated</option>
              </select>
            </td>
            <td />
          </tr>
          {elmTasks}
        </tbody>
      </table>
    );
  }
}
