import React, { Component } from "react"
import "./App.css"
import axios from "axios"

class App extends Component {
  state = { users: [], value: "", uservalues: {} }

  componentDidMount() {
    axios.get("/users").then((response) => {
      const users = response.data
      this.setState({ users })
    })
  }

  createUser = (data) => {
    console.log(data)
    axios.post("/users", { data }).then(() => {
      axios.get("/users").then((response) => {
        const users = response.data
        this.setState({ users })
      })
    })
  }

  updateUser = () => {
    console.log("updateuser")
  }

  deleteUser = (id) => {
    axios.delete(`/users/${id}`).then(() => {
      axios.get("/users").then((response) => {
        const users = response.data
        this.setState({ users })
      })
    })
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  updateChange = (event, id) => {
    this.setState({})
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        <table style={{ display: "inline-table" }}>
          <tbody>
            {this.state.users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div>{user.username}</div>
                </td>
                <td>
                  <input
                    type="text"
                    value={user.username}
                    onChange={(event) => this.updateChange(event, user._id)}
                  />
                </td>
                <td>
                  <button onClick={() => this.updateUser(user._id)}>Update</button>
                </td>
                <td>
                  <button onClick={() => this.deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button onClick={() => this.createUser({ username: this.state.value })}>
          New
        </button>
      </div>
    )
  }
}

export default App
