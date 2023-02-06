const express=require("express");
const router=express.Router();

const userController=require("../controllers/userController");
const verifyJwt=require("../middleware/verifyJwt");

router.post("/login",userController.login);

router.post("/register",userController.register);

router.put("/edit",verifyJwt,userController.updateinfo);

router.get("/getuser",verifyJwt,userController.getinfo);

router.get("/getother/:user2",verifyJwt,userController.getother);

router.get("/getall",verifyJwt,userController.getall);

module.exports=router;