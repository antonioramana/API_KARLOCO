const express=require("express");
const router=express.Router();
const verifyJwt=require("../middleware/verifyJwt");
const upload=require("../middleware/upload");

const carController=require("../controllers/carController");

router.get("/all",verifyJwt,carController.getAll);

router.get("/one/:immatriculation",verifyJwt,carController.getOne);

router.get("/getfive",carController.getFive);

router.get("/getbyuser",verifyJwt,carController.getByUser);

router.post("/create",verifyJwt,upload.single("caImage"),carController.addCar);

router.put("/edit/:immatriculation",verifyJwt,carController.updateCar);

router.delete("/delete/:immatriculation",verifyJwt,carController.deleteCar);


module.exports=router;