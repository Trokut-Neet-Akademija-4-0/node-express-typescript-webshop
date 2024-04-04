interface User {
  id: string
  name: string
}

class UserService {
  private users: User[] = []

  constructor() {
    // Initially, let's add some dummy users
    this.users.push({ id: '1', name: 'Alice' })
    this.users.push({ id: '2', name: 'Bob' })
    this.users.push({ id: '3', name: 'Charlie' })
  }

  getAllUsers(): User[] {
    return this.users
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id)
  }
}

export default new UserService()
