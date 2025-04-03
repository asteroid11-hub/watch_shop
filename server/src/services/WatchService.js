const { Watch } = require('../../db/models');

class WatchService {

    static async getAll() {
        const watches = await Watch.findAll();
        return watches;
    }

    static async getOneWatch(id) {
        const watch = await Watch.findByPk(id);
        return watch;
    }

    // static async createWatch(model, description, image) {
    //     const watch = await Watch.create({ model, description, image });
    //     return watch;
    // }

    static async updateWatch(id, model, description, image) {
        const watch = await Watch.findByPk(id);
        watch.model = model;
        watch.description = description;
        watch.image = image;
        await watch.save();
        return watch;
    }

    static async deleteWatch(id) {
        const watch = await Watch.findByPk(id);
        await watch.destroy();
        return watch;
    }

}

module.exports = WatchService;
