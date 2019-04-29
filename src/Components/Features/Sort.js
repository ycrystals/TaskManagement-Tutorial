import React, { Component } from "react";

export default class Sort extends Component {
  onClick = (sortBy, sortValue) => {
    this.props.onSort(sortBy, sortValue);
  };

  render() {
    return (
      <div className="col-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            className="btn btn-success dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sort by
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li
              className={
                this.props.sortBy === "name" && this.props.sortValue === 1
                  ? "dropdown-item selected"
                  : "dropdown-item"
              }
              onClick={() => this.onClick("name", 1)}
            >
              <a role="button">
                <span className="fa fa-sort-alpha-asc mr-2" />Name A-Z
              </a>
            </li>
            <li
              className={
                this.props.sortBy === "name" && this.props.sortValue === -1
                  ? "dropdown-item selected"
                  : "dropdown-item"
              }
              onClick={() => this.onClick("name", -1)}
            >
              <a role="button">
                <span className="fa fa-sort-alpha-desc mr-2" />Name Z-A
              </a>
            </li>
            <li role="separator" className="dropdown-divider" />
            <li
              className={
                this.props.sortBy === "status" && this.props.sortValue === 1
                  ? "dropdown-item selected"
                  : "dropdown-item"
              }
              onClick={() => this.onClick("status", 1)}
            >
              <a role="button">Activated</a>
            </li>
            <li
              className={
                this.props.sortBy === "status" && this.props.sortValue === -1
                  ? "dropdown-item selected"
                  : "dropdown-item"
              }
              onClick={() => this.onClick("status", -1)}
            >
              <a role="button">Deactivated</a>
            </li>
          </div>
        </div>
      </div>
    );
  }
}
