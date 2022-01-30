const { body } = require('express-validator');

exports.create = [
    body('title', 'title length must be not greater than 50 characters!').trim().notEmpty().isLength({ max: 50 }),
];