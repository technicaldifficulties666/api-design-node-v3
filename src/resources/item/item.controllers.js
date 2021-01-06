import { Item } from './item.model'

export const getItem = (req, res) => {
  console.log('placeholder for get')
  // res.status(200).json({ data: req.user })
}

export const updateItem = async (req, res) => {
  console.log('placeholder for put')
  /* try {
      const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true
      })
        .lean()
        .exec()
  
      res.status(200).json({ data: user })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    } */
}

export const addItem = (req, res) => {
  console.log('placeholder for post')
}

export const removeItem = (req, res) => {
  console.log('placeholder for delete')
}

// export default {}
