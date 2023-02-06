const express=require("express");
const router=express.Router();
const verifyJwt=require("../middleware/verifyJwt");

const reservationController=require("../controllers/reservationController");

router.get("/getbyidowner",verifyJwt,reservationController.getByIdOwner);

router.get("/getbyidtenant",verifyJwt,reservationController.getByIdTenant);

router.post("/create",verifyJwt,reservationController.addReservation);

router.delete("/delete/:id_res",verifyJwt,reservationController.deleteReservation);

module.exports=router;