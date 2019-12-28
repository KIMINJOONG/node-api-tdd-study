// 실제 로직
const models = require("../../models");

const index = (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  models.User.findAll({
    limit: limit
  }).then(users => {
    res.json(users);
  });
};

const show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  models.User.findOne({
    where: {
      id
    }
  }).then(user => {
    if (!user) {
      return res.status(404).end();
    }
    return res.json(user);
  });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  models.User.destroy({
    where: { id }
  }).then(() => {
    return res.status(204).end();
  });
};

const create = (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).end();
  }

  models.User.create({ name })
    .then(user => {
      return res.status(201).json(user);
    })
    .catch(err => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).end();
      }
      return res.status(500).end();
    });
};

const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const name = req.body.name;
  if (!name) {
    return res.status(400).end();
  }

  models.User.findOne({
    where: { id }
  }).then(user => {
    if (!user) {
      return res.status(404).end();
    }
    user.name = name;
    user
      .save()
      .then(_ => {
        return res.json(user);
      })
      .catch(err => {
        if (err.name === "SequelizeUniqueConstraintError") {
          return res.status(409).end();
        }
        return res.status(500).end();
      });
  });
};
module.exports = {
  index: index,
  show: show,
  destroy: destroy,
  create: create,
  update: update
};
