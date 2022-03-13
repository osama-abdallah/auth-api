
class Collection {
  constructor(model) {
    this.model = model;
  }
  
  async dataCreated(object) {
    try {
      return await this.model.create(object);
    } catch (error) {
      console.log("error for dataCreated");
    }
  }

  async getData(id) {
    try {
      if (id) {
        return await this.model.findOne({ where: { id: id } });
      } else {
        return await this.model.findAll();
      }
    } catch (error) {
      console.log("error in getData");
    }
  }

async dataUpdated(id, updatedBody){
    try {
            return await this.model.update(updatedBody, { where: { id: id } });
          }
    catch (error) {
        
        console.log('error in dataUpdated');
    }
}

async dataDeleted(id){
    try {
        return await this.model.destroy({ where: { id: id } });
    } catch (error) {
        console.log('error in dataDeleted');
    }
}

}
module.exports = Collection;
