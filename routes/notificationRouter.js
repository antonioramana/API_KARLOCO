const express=require("express");
const router=express.Router();
const verifyJwt=require("../middleware/verifyJwt");

const notificationController=require("../controllers/notificationController");

router.get("/get", verifyJwt,notificationController.get);

router.get("/getCount", verifyJwt,notificationController.getCount); 

router.post("/create", verifyJwt,notificationController.addNotification);

router.put("/edit", verifyJwt,notificationController.editNotification);

router.delete("/delete/:id_notif", verifyJwt,notificationController.deleteNotification);

module.exports=router;