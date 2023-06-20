import { promises as fs } from "fs";

class CartManager {
  async getProducts(limit) {
    try {
      const content = JSON.parse(
        await fs.readFile(`./Data/Cart.json`, "utf-8")
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

  async createCart() {
    try {
      const saveCont = await this.getProducts();
      const lastId = saveCont.length;
      const newProduct = {
        id: lastId + 1,
        productos: [],
      };
      await saveCont.push(newProduct);
      console.log("producto nuevo", newProduct);
      await fs.writeFile(`./Data/Cart.json`, JSON.stringify(saveCont, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(cid, product, pid) {
    try {
      const cart = await this.getProducts();
      const cartIndex = cart.findIndex(c => c.id === cid);
      
      if (cartIndex === -1) {
        return { error: "El carrito no existe" };
      }
      
      const existingProductIndex = cart[cartIndex].productos.findIndex(
        p => p.id === pid
      );
  
      if (existingProductIndex !== -1) {
        cart[cartIndex].productos[existingProductIndex].Quantity++;
      } else {
        const newProduct = {
          id: pid,
          Quantity: 1,
        };
        cart[cartIndex].productos.push(newProduct);
      }
  
      const groupedProducts = cart.reduce((accumulator, current) => {
        const index = accumulator.findIndex(
          (product) => product.products.id === current.products.id
        );
  
        if (index === -1) {
          accumulator.push(current);
        } else {
          accumulator[index].Quantity += current.Quantity;
        }
  
        return accumulator;
      }, []);
  
      await fs.writeFile(
        `./Data/Cart.json`,
        JSON.stringify(groupedProducts, null, 2)
      );
  
      console.log("producto nuevo", product);
    } catch (error) {
      console.log(error);
      return { error: "Error al agregar el producto al carrito" };
    }
  }
  

  async getById(id) {
    try {
      const products = await this.getProducts();
      const getById = products.filter((product) => product.id === id);
      console.log("producto buscado", getById);
      return getById;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const content = await this.getProducts();
      const deleteById = content.filter((product) => product.id !== id);
      console.log("producto eliminado", deleteById);
      await fs.writeFile(
        `./Data/Cart.json`,
        JSON.stringify(deleteById, null, 2)
      );
      return deleteById;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      let products = await this.getProducts();
      products.splice(0, products.length);

      await fs.writeFile(
        `./Data/Cart.json`,
        JSON.stringify(products, null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default CartManager;
