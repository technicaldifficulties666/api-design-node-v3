export const getOne = model => async (req, res) => {
  try {
    const id = req.params.id
    const userId = req.user._id
    const item = await model.findOne({ _id: id, createdBy: userId }).exec()
    res.status(200).json({ data: item })
  } catch (e) {
    console.error(e)
    res.status(404).end()
  }
}

export const getMany = model => async (req, res) => {
  try {
    const user = req.user._id
    const item = await model.find({ createdBy: user }).exec()
    res.status(200).json({ data: item })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createOne = model => async (req, res) => {
  try {
    const user = req.user._id
    const name = req.body
    const newItem = await model.create({ createdBy: user, name: name }).exec()
    res.status(201).send({ message: 'Item created: ' + newItem })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const updateOne = model => async (req, res) => {
  try {
    const id = req.params.id
    const user = req.user._id
    const item = await model
      .findOneAndUpdate({ _id: id, createdBy: user }, req.body, {
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
    const id = req.params.id
    const user = req.user._id
    const item = await model
      .findOneAndRemove({ _id: id, createdBy: user })
      .exec()
    res.status(200).json({ itemRemoved: item })
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

