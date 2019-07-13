module.exports = (req, res, next) => {
  if (req.params.id && (!Number.isInteger(+req.params.id) || +req.params.id < 1)) {
    return res.status(400).send({
      errors: [{ error: 'invalid id' }],
    });
  }

  return next();
};
