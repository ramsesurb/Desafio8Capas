import mongoose from "mongoose"

const Collection = 'Cart'

const cartSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  productos: {
    type: [
      {
          producto : {
              type: mongoose.Schema.Types.ObjectId,
              ref:"Products"
          },
          quantity: Number,
          id:Number,
          
      }
  ],
  default: []
  }
},{ collection: "Cart" });


const cartModel = mongoose.model(Collection, cartSchema);
 

  export default cartModel
