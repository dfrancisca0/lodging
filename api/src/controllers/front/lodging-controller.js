const sequelizeDb = require('../../models')
const Lodging = sequelizeDb.Lodging
const Op = sequelizeDb.Sequelize.Op

exports.create = (req, res) => {
  const lodgingData = req.body.map(item => {
    if (item.geocoded_column && item.geocoded_column.coordinates) {
      const { coordinates } = item.geocoded_column
      item.latitude = coordinates[1]
      item.longitude = coordinates[0]
    } else {
      item.latitude = null
      item.longitude = null
    }

    delete item.geocoded_column

    return item
  })
  
  Lodging.bulkCreate(lodgingData).then(async data => {
    res.status(200).send(data)
  }).catch(err => {
    if (err.errors) {
      res.status(422).send({
        message: err.errors
      });
    } else {
      res.status(500).send({
        message: 'Algún error ha surgido al insertar el dato.'
      })
    }
  })
}

exports.findAll = (req, res) => {
  Lodging.findAll({
    order: [['createdAt', 'DESC']]
  })
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al recuperar los datos.'
      })
    })
}