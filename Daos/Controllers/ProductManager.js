import { promises as fs } from "fs";

class ProductManager {
  async getProducts(limit) {
    try {
      const content = JSON.parse(
        await fs.readFile(`./Data/Productos.json`, "utf-8")
      );
      if (limit) {
        return content.slice(0, limit);
      }
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
        let mensaje = `Ya existe un producto con el código ${prod.code}`;
        console.log(mensaje);
        return { error: mensaje };
      }

      if (
        !prod.titulo ||
        !prod.descripcion ||
        !prod.precio ||
        !prod.code ||
        !prod.thumbnail ||
        !prod.stock
      ) {
        let mensaje = "Todos los campos son obligatorios";
        console.log(mensaje);
        return { error: mensaje };
      }
      const id = (Math.floor(Math.random() * 100) % 100).toString().padStart(2, '0');
      const lastId = saveCont.length;
      const newProduct = {
        id: id,
        titulo: prod.titulo,
        descripcion: prod.descripcion,
        precio: prod.precio,
        code: prod.code,
        thumbnail: prod.thumbnail,
        stock: prod.stock,
        status: true,
      };
      await saveCont.push(newProduct);

      await fs.writeFile(
        `./Data/Productos.json`,
        JSON.stringify(saveCont, null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  }
  async updateProductById(id, newProduct) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        console.log(`Producto con id ${id} no encontrado`);
        return null;
      }
      const updatedProduct = { ...products[productIndex], ...newProduct };
      products[productIndex] = updatedProduct;
      await fs.writeFile(
        `./Data/Productos.json`,
        JSON.stringify(products, null, 2)
      );
      console.log(`Producto con id ${id} actualizado:`, updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async getByid(id) {
    try {
      const prod = await rute.getProducts();
      const getByid = prod.filter((e) => e.id === id);
      console.log("producto buscado", getByid);
      return getByid;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      const content = await rute.getProducts();
      const deleteByid = content.filter((e) => e.id !== id);
      console.log("producto eliminado");
      await fs.writeFile(
        `./Data/Productos.json`,
        JSON.stringify(deleteByid, null, 2)
      );
      return deleteByid;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      let products = await rute.getProducts();
      products.splice(0, products.length);

      await fs.writeFile(
        `./Data/Productos.json`,
        JSON.stringify(products, null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  }
}
export default ProductManager;
const rute = new ProductManager("./Data/Productos.json");

rute.getProducts();
