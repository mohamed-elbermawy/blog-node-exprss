const Joi = require('joi')
// Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');


const postValidation = (data) =>{
    const schema = Joi.object({
        // userId: mongoose.Schema.Types.ObjectId,
        title: Joi.string()
            .required()
            .min(10)
            .max(20),
    
        body: Joi.string()
            .required()
            .min(10)
            .max(500),
       
        tags: Joi.array()
            .items(Joi.string()
            .max(10)),

    }).unknown()

    return schema.validate(data)
}

module.exports= {
    postValidation,
}