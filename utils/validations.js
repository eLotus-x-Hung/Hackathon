const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = Joi.object({

        username: Joi.string()
            .min(3)
            .required(),
        
        password: Joi.string()
            .min(8)
            .required(),
        
        date: Joi.date()
            .default(Date.now),

    })

    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .required(),
        
        password: Joi.string()
            .min(8)
            .required(),
    })

    return schema.validate(data)
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation