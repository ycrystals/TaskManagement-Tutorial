import React, { Component } from "react";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      status: false
    };

    this.onCloseAddItem = this.onCloseAddItem.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  componentWillMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    } else if (!nextProps.task) {
      this.setState({
        id: "",
        name: "",
        state: false
      });
    }
  }

  onCloseAddItem() {
    this.props.onCloseAddItem();
  }

  onChange(event) {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }

    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseAddItem();
  }

  onClear() {
    this.setState({
      name: "",
      status: false
    });
  }

  render() {
    const { id } = this.state;

    return (
      <div className="container">
        <div className="card">
          <div className="card-header bg">
            <h3 className="card-title">
              {id !== "" ? "Edit Active" : "Add Active"}
              <span className="fas fa-ban ml-3" onClick={this.onCloseAddItem} />
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit} className="was-validated">
              <div className="form-group">
                <label>Name: </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  required
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">
                  Please fill out this field.
                </div>
              </div>
              <label>Status :</label>
              <select
                className="form-control"
                required="required"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
              >
                <option value={true}>Active</option>
                <option value={false}>Deactive</option>
              </select>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-warning mr-3">
                  <i className="fas fa-plus mr-2" />
                  Add&nbsp;
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onClear}
                >
                  <i className="fas fa-times mr-2" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
