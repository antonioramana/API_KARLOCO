const express=require("express");
const router=express.Router();
const verifyJwt=require("../middleware/verifyJwt");

const favorisController=require("../controllers/favorisController");

router.get("/get", verifyJwt,favorisController.get);

router.post("/create", verifyJwt,favorisController.addFavoris);

router.delete("/delete/:immatriculation", verifyJwt,favorisController.deleteFavoris);

module.exports=router;