import React, { Component } from "react";

export default class TaskDatas extends Component {
  constructor(props) {
    super(props);

    this.onUpDateStatus = this.onUpDateStatus.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onUpDateStatus() {
    this.props.onUpdateStatus(this.props.task.id);
  }

  onDelete() {
    this.props.onDelete(this.props.task.id);
  }

  onEdit() {
    this.props.onEdit(this.props.task.id);
  }

  render() {
    var { task, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            className={
              task.status === true
                ? "badge badge-success"
                : "badge badge-danger"
            }
            onClick={this.onUpDateStatus}
          >
            {task.status === true ? "Activated" : "Deactivated"}
          </span>
        </td>

        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning mr-2"
            onClick={this.onEdit}
          >
            <span className="fas fa-pencil-alt mr-2" />
            Edit &nbsp;
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={this.onDelete}
          >
            <span className="fas fa-trash-alt mr-2" />
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
