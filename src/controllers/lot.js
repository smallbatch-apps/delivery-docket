const url = require('url');

const DeliveryDocket = require('../models/DeliveryDocket');

module.exports = {
  async index(req, res) {
    const { id } = req.params;

    const docket = await DeliveryDocket.findById(id).exec();

    const lots = docket.lots;
    res.json({lots});
  },

  async store(req, res) {
    const { id } = req.params;
    const { lot } = req.body;

    const docket = await DeliveryDocket.findById(id).exec();
    const lotLength = docket.lots.length;
    docket.lots.push(lot);

    const error = docket.validateSync();
    const newLot = docket.lots[lotLength];

    if (error) {
      const errorMessages = Object.values(error.errors).map(error => ({
        field: error.properties.path,
        message: error.properties.message
      }));

      res.status(400).json(errorMessages);
      return;
    }

    await docket.save();

    const docketUrl = url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: `/dockets/${id}`
    });

    res.status(201).links({
      docket: docketUrl,
    }).json({lot: newLot});
  }
}