
import productoModel from '../Models/mongo.js';

class ProductManagerMongo {
  async getProducts(limit, sort, descripcion) {
    try {
      let query = productoModel.find();

      if (sort) {
        query = query.sort(sort);
      }

      if (limit) {
        query = query.limit(limit);
      }

      if (descripcion) {
        query = query.find({ descripcion });
      }

      const content = await query.exec();

      return content;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async addProduct(prod) {
    try {
      const saveCont = await this.getProducts();

      const codeExists = saveCont.some((product) => product.code === prod.code);
      if (codeExists) {
        const errorMsg = `Ya existe un producto con el código ${prod.code}`;
        
        console.log(errorMsg);
        return { error: errorMsg };
        
      }

      if (!prod.titulo ||!prod.descripcion ||!prod.precio ||!prod.code ||!prod.thumbnail ||!prod.stock) 
      socket.emit("error", { message: "Todos los campos son obligatorios", status: 400 });
      {
        console.log("Todos los campos son obligatorios");
      }
      
      const newProduct = {
        id: (Math.floor(Math.random() * 1000) % 1000).toString().padStart(3, '0'),
        titulo: prod.titulo,
        descripcion: prod.descripcion,
        precio: prod.precio,
        code: prod.code,
        thumbnail: prod.thumbnail,
        stock: prod.stock,
        status: true
      };
      const result = await productoModel.create(newProduct)
      return result
    } catch (error) {
      console.log(error);
    }
  }
 
  async getByid(id) {
    try {
      
      const getByid =await productoModel.findOne({id:id})
      console.log("producto buscado", getByid);
      return getByid;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      const deleteByid = await productoModel.findOneAndDelete({id:id})
      return deleteByid;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      let products = await this.getProducts();
      products.splice(0, products.length);

     
    } catch (error) {
      console.log(error);
    }
  }

}
export default ProductManagerMongo
const rute = new ProductManagerMongo("./Data/Productos.json");
