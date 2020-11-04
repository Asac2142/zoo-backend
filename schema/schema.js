const Joi = require('joi');

const schema = Joi.object({
    id: Joi.string().required(),
    family: Joi.string().required(),
    specie: Joi.string().required(),
    name: Joi.string().min(3).max(15).required(),
    imageUrl: Joi.string(),
    age: Joi.number().greater(0).required(),
    active: Joi.boolean().required(),
    medical_status: Joi.string().required()
});

const validate = (payload) => {
    return schema.validate(payload);
}

module.exports = validate;
