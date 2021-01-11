import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }
  try {
    // create new user
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password
    })
    const token = newToken(newUser)
    return res.status(201).send({ token })
  } catch (e) {
    return res.status(500).end()
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }
  const invalid = { message: 'Invalid email and password combination' }
  try {
    // user sign in
    const user = await User.findOne({ email: req.body.email })
      .select('email password')
      .exec()
    if (!user) {
      return res.status(401).send(invalid)
    }
    const match = await user.checkPassword(req.body.password)
    if (!match) {
      return res.status(401).send(invalid)
    }
    const token = newToken(user)
    res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

export const protect = async (req, res, next) => {
  const bearers = req.headers.authorization
  if (!bearers /*! bearers || !bearers.startsWith('Bearer ') */) {
    res.status(401).end()
  }
  const token = bearers.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }
  const user = User.findById(payload.id)
    .select('-password')
    .lean()
    .exec()
  if (!user) {
    res.status(401).end()
  }
  req.user = user
  next()
}
