import Joi from 'joi';

const movieSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  studio: Joi.string().required(),
  genre: Joi.string().required(),
  year: Joi.number().integer().required(),
});

const commentSchema = Joi.object({
  user: Joi.string().required(),
  movie: Joi.number().integer(),
  text: Joi.string().required(),
});

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

function validate(schema: Joi.Schema) {
  return (params: any) :Error | void =>  {
    const { error } = schema.validate(params, { abortEarly: false });

    if (error) {
      const errorMessage = error.details
        .map(e => e.message)
        .join('. ')
        .replace(/"/g, "'");

      return new Error(errorMessage);
    }
  };
}

export const validateMovie = validate(movieSchema);
export const validateComment = validate(commentSchema);
export const validateUser = validate(userSchema);
