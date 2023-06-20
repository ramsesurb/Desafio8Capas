import chatModel from "../Models/chat.js"

class ChatManager {
    async getChat(limit) {
      try {
        
          const content = await chatModel.find()
        
        
        if (limit) {
          return content.slice(0, limit);
        }
        return content;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    async addMenssage(chat) {
      try {
        const saveCont = await this.getChat();
    
        if (
          !chat.usuario ||
          !chat.mensaje 
        ) {
          let mensaje = "Todos los campos son obligatorios";
          console.log(mensaje);
          return { error: mensaje };
        }
        const id = (Math.floor(Math.random() * 100000000)).toString().padStart(8, '0');
        const newChat = {
          id: id,
          usuario: chat.usuario,
          mensaje: chat.mensaje
        };
        const result = await chatModel.create(newChat)
        
      } catch (error) {
        console.log(error);
      }
    }
  
   async getByid(id) {
    try {
      
      const getByid =await chatModel.findOne({id:id})
      console.log("chat buscado", getByid);
      return getByid;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      const deleteByid = await chatModel.findOneAndDelete({id:id})
      return deleteByid;
    } catch (error) {
      console.log(error);
    }
  }
    async deleteAll() {
      try {
        let chatucts = await rute.getChat();
        chatucts.splice(0, chatucts.length);
  
       
      } catch (error) {
        console.log(error);
      }
    }
  }
  export default ChatManager;
  const rute = new ChatManager("./Data/Chat.json");
 
