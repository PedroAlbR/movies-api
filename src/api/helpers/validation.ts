import Joi from 'joi';

// Movie
const movieSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  studio: Joi.string().required(),
  genre: Joi.string().required(),
  year: Joi.number().integer().required(),
});

// Comment
const commentEditSchema = Joi.object({
  text: Joi.string().required(),
});

const commentCreateSchema = Joi.object({
  user: Joi.string().required(),
  movie: Joi.number().integer(),
});

// User
const userEditSchema = Joi.object({
  password: Joi.string().required(),
});

const userCreateSchema = userEditSchema.append({
  id: Joi.string().required(),
});

function validate(schema: Joi.Schema) {
  return (params: any): Error | void => {
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

export const validateEditComment = validate(commentEditSchema);
export const validateCreateComment = validate(commentCreateSchema);

export const validateEditUser = validate(userEditSchema);
export const validateCreateUser = validate(userCreateSchema);
