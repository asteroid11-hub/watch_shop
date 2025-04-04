const { Marketing } = require('../../db/models');

class MarketingService {
  static async getAll() {
    const marketings = await Marketing.findAll();
    return marketings;
  }

  static async getOne(id) {
    const marketing = await Marketing.findByPk(id);
    return marketing;
  }

  static async create(model, description, image) {
    const marketing = await Marketing.create({ model, description, image });
    return marketing;
  }

  static async update(id, { model, description, image }) {
    const marketing = await Marketing.findByPk(id);
    marketing.model = model;
    marketing.description = description;
    console.log({ image });
    marketing.image = image;
    await marketing.save();
    return marketing;
  }

  static async delete(id) {
    const marketing = await Marketing.findByPk(id);
    await marketing.destroy();
    return marketing;
  }
}

module.exports = MarketingService;
