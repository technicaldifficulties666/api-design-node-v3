import { Router } from 'express'
import { getItem, updateItem, removeItem, addItem } from './item.controllers'
const router = Router()

// /
router
  .route('/')
  .get(getItem)
  .post(addItem)

// /:id
router
  .route('/:id')
  .get(getItem)
  .put(updateItem)
  .delete(removeItem)

// /api/list/:id
/* router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne) */

export default router
