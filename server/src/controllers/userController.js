module.exports = {
  findAll: async (req, res) => {
    try {
      return res.send("Hi");
    } catch (error) {
      return res.send(error.message);
    }
  },
  findOne: async (req, res) => {
    console.log("hi");
  },
  create: async (req, res) => {},
  update: async (req, res) => {},
  remove: async (req, res) => {},
};
