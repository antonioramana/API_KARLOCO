const express=require("express");
const router=express.Router();
const verifyJwt=require("../middleware/verifyJwt");

const chatController=require("../controllers/chatController");

router.get("/message/:user2",verifyJwt,chatController.getMessage);

router.get("/count",verifyJwt,chatController.getCount);

router.get("/conversation",verifyJwt,chatController.getConversation);

router.post("/create",verifyJwt,chatController.addMessage);

router.put("/editlu",verifyJwt,chatController.updateLu);

router.put("/editlast/:user2",verifyJwt,chatController.updateLast);

router.delete("/deletemessage/:id_mess",verifyJwt,chatController.deleteMessage);

module.exports=router;