import React, { Component } from "react"
import "./App.css"
import axios from "axios"

class App extends Component {
  state = { users: [], tmpUser: [], newUser: "" }

  componentDidMount() {
    axios.get("/users").then((response) => {
      const users = response.data
      const usersCopy = JSON.parse(JSON.stringify(users))
      this.setState({ users: users, tmpUser: usersCopy })
    })
  }

  createUser = (data) => {
    console.log(data)
    axios.post("/users", { data }).then(() => {
      axios.get("/users").then((response) => {
        const users = response.data
        const usersCopy = JSON.parse(JSON.stringify(users))
        this.setState({ users: users, tmpUser: usersCopy })
      })
    })
  }

  updateUser = (id) => {
    const tmpUser = this.state.tmpUser.find((cuser) => cuser._id === id)
    const newUser = { _id: tmpUser.id, username: tmpUser.username }

    axios.put(`/users/${id}`, newUser).then(() => {
      axios.get("/users").then((response) => {
        const users = response.data
        const usersCopy = JSON.parse(JSON.stringify(users))
        this.setState({ users: users, tmpUser: usersCopy })
      })
    })
  }

  deleteUser = (id) => {
    axios.delete(`/users/${id}`).then(() => {
      axios.get("/users").then((response) => {
        const users = response.data
        const usersCopy = JSON.parse(JSON.stringify(users))
        this.setState({ users: users, tmpUser: usersCopy })
      })
    })
  }

  createUserInputOnChange = (value) => {
    this.setState({ newUser: value })
  }

  updateUserInputOnchange = (value, id) => {
    const tmpUser = this.state.tmpUser
    tmpUser.find((cuser) => cuser._id === id).username = value
    this.setState({ tmpUser: tmpUser })
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
                    value={
                      this.state.tmpUser.find((cuser) => cuser._id === user._id)
                        .username
                    }
                    onChange={(event) =>
                      this.updateUserInputOnchange(event.target.value, user._id)
                    }
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
        <input
          type="text"
          value={this.state.newUser}
          onChange={(event) => this.createUserInputOnChange(event.target.value)}
        />
        <button onClick={() => this.createUser({ username: this.state.newUser })}>
          New
        </button>
      </div>
    )
  }
}

export default App
