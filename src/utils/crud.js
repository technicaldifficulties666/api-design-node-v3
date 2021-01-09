export const getOne = model => async (req, res) => {
  try {
    const item = await model.findById(req.params.id, req.params._id).exec()
    res.status(200).json({ result: item })
  } catch (e) {
    console.error(e)
    res.status(404).end()
  }
}

export const getMany = model => async (req, res) => {
  try {
    const item = await model.find().exec()
    res.status(200).json({ data: item })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createOne = model => async (req, res) => {
  try {
    const newItem = await model.create().exec()
    res.status(201).send({ message: 'Item created: ' + newItem })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const updateOne = model => async (req, res) => {
  try {
    const item = await model
      .findByIdAndUpdate(req.params.id, {
        new: true
      })
      .lean()
      .exec()
    res.status(200).json({ updatedItem: item })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const removeOne = model => async (req, res) => {
  try {
    const item = await model.findByIdAndRemove(req.params.id).exec()
    res.status(200).send({ itemRemoved: item })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})

/*
  get /item  READ
  get /item/:id READ ONE
  post /item CREATE
  put /item/:id UPDATE ONE
  delete /item/:id DESTROY ONE
*/

