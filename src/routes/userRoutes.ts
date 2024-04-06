import express, { Request, Response } from 'express'
import userService from '../services/userService'

const router = express.Router()

interface User {
  id: string
  name: string
}

router.get('/', (req: Request, res: Response) => {
  const users = userService.getAllUsers()
  res.send(users)
})

router.get('/:id', (req: Request, res: Response) => {
  const userId = req.params.id
  const user = userService.getUserById(userId)
  if (user) {
    res.send(user)
  } else {
    res.status(404).send('User not found')
  }
})

router.delete('/:id', (req: Request, res: Response) => {
  const bla: User = { id: '', name: '' }
  bla.id = 'test'
  const userId = req.params.id
  const user = userService.deleteUserById(userId)
  if (user) {
    res.send(user)
  } else {
    res.status(404).send('User not found')
  }
})

export default router
