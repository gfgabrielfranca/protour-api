module.exports = (req, res, next) => {
  if (req.query.page && (!Number.isInteger(+req.query.page) || +req.query.page < 1)) {
    return res.status(400).send({
      errors: [{ error: 'invalid page' }],
    });
  }

  return next();
};
