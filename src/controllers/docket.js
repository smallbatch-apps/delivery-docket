const DeliveryDocket = require('../models/DeliveryDocket');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const searchObject = {};

    if (req.user.type === 'standard') {
      searchObject.user = req.user.id;
    }

    const dockets = await DeliveryDocket.find(searchObject).populate('user', '-password');

    res.json({dockets});
  },

  async show(req, res){
    // do not allow showing data if not correct user
    const { id } = req.params;
    const docket = await DeliveryDocket.findById(id);

    res.json({docket});
  },

  async store(req, res){

    const user = req.user.id;

    const {carrier, brandNumber, pickUpDate, freightPayableBy, lots = [], declaration = null} = req.body.docket;

    const docket = new DeliveryDocket({
      carrier, brandNumber,
      creationDate: new Date(),
      lodgementDate: null,
      pickUpDate: new Date(pickUpDate),
      freightPayableBy,
      lots,
      user,
      declaration
    });

    const error = docket.validateSync();

    if (error) {
      const errorMessages = Object.values(error.errors).map(err => ({
        field: err.properties.path,
        message: err.properties.message
      }));

      res.status(400).json(errorMessages);
      return;
    }

    await docket.save();
    res.json({docket});
  },

  async update(req, res){
    const { id } = req.params;
    await DeliveryDocket.findByIdAndUpdate(id, req.body.docket);

    const docket = await DeliveryDocket.findById(id);
    res.json({docket});
  }
};