import express, { Request, Response } from 'express'
import userService from '../services/userService'

const router = express.Router()

router.get('/users', (req: Request, res: Response) => {
  const users = userService.getAllUsers()
  res.send(users)
})

router.get('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id
  const user = userService.getUserById(userId)
  if (user) {
    res.send(user)
  } else {
    res.status(404).send('User not found')
  }
})

export default router
