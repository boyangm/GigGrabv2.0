const db = require('../models');

//controller for the gig model
module.exports = {
  findAll: function (req, res) {
    db.Gigs
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Gigs
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Gigs
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    const query = `$${req.body.action}: {gigsMates: ${req.body.memberId}}`
      db.Gigs
        .findOneAndUpdate({ _id: req.params.id }, {query},{ multi: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    
  },
  remove: function (req, res) {
    db.Gigs
      .deleteOne({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeUser: function (req, res) {

    db.Gigs
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  close: function (req, res) {
    db.Gigs
      .findOneAndUpdate({ _id: req.params.id },{status: 'closed'})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


}