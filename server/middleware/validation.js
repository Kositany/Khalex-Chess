import Joi from 'joi'

// Validation middleware for payment requests
export const validatePayment = (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().min(1).max(100000).required(),
    phoneNumber: Joi.string().pattern(/^(\+254|254|0)[17]\d{8}$/).required(),
    productId: Joi.string().required(),
    productName: Joi.string().min(1).max(100).required()
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    })
  }

  next()
}

// Validation middleware for email subscription
export const validateEmail = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required()
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    })
  }

  next()
}

// Validation middleware for contact form
export const validateContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^(\+254|254|0)[17]\d{8}$/).required(),
    message: Joi.string().min(10).max(1000).required()
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    })
  }

  next()
}