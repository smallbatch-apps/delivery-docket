const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.find({});
    res.json({users});
  },

  async show(req, res){
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({user});
  },

  async store(req, res){
    const {name, email, phone, address, password} = req.body.user;

    const user = new User({ name, email, phone, address, password });

    const error = user.validateSync();

    if (error) {
      const errorMessages = Object.values(error.errors).map(error => ({
        field: error.properties.path,
        message: error.properties.message
      }));

      res.status(400).json(errorMessages);
      return;
    }

    // Blockchain: possibly create new wallet with ethers?

    await user.save();
    res.json({user});
  },

  async update(req, res){
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body.user);

    const user = await User.findById(id);

    res.json({user});
  }
}