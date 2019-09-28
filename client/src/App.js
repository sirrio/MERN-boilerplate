import React, { Component } from "react"
import "./App.css"

class App extends Component {
  state = { users: [], value: "bla" }

  componentDidMount() {
    fetch("/users")
      .then((res) => res.json())
      .then((users) => this.setState({ users }))
  }

  createUser = (data) => {
    fetch("/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((users) =>
        fetch("/users")
          .then((res) => res.json())
          .then((users) => this.setState({ users }))
      )
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map((user) => (
          <div key={user.id}>{user.username}</div>
        ))}
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button onClick={() => this.createUser({ username: this.state.value })}>
          New
        </button>
      </div>
    )
  }
}

export default App
