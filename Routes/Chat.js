import { Router } from "express";
import ChatManager from "../Daos/Controllers/ChatManager.js";
const chat = new ChatManager();

const realTimeChat = Router();

//vista home productos
realTimeChat.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const chatRaw = await chat.getChat(limit);
  const chats = chatRaw.map(item=>item.toObject())
  res.render("chat", { chat: chats });
});
export default realTimeChat;
