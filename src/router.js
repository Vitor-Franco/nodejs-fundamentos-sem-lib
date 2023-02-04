import { buildRoutePath } from "./utils/buildRoutePath.js";
import { randomUUID } from 'node:crypto'
import { TaskModel } from "./models/TaskModel.js";
import { Database } from "./database.js";

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      if(!title || !description) {
        return res.writeHead(400).end()
      }

      const task = new TaskModel()
      task.id = randomUUID()
      task.title = title
      task.description = description

      database.insert('tasks', task)
      return res.writeHead(201).end()
    },
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query
      const tasks = database.select('tasks', {
        title: search || '',
        description: search || ''
      })

      return res.end(JSON.stringify(tasks))
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const [taskExists] = database.select('tasks', {
        id,
      })

      if(!taskExists) {
        return res.writeHead(404).end()
      }

      const { title, description } = req.body

      if(!title || !description) {
        return res.writeHead(400).end()
      }

      database.update('tasks', id, {
        title,
        description
      })

      return res.writeHead(204).end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const [taskExists] = database.select('tasks', {
        id,
      })

      if(!taskExists) {
        return res.writeHead(404).end()
      }

      database.delete('tasks', id)

      return res.writeHead(204).end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params
      const [taskExists] = database.select('tasks', {
        id,
      })

      if(!taskExists) {
        return res.writeHead(404).end()
      }

      const isCompletedTask = taskExists.completed_at !== null
      database.update('tasks', id, {
        completed_at: isCompletedTask ? null : new Date()
      })

      return res.writeHead(204).end()
    },
  },
]