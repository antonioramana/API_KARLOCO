const db=require("../config/database");

module.exports={
  // get all car 
    getAll:(req,res)=>{
    const getAllCar="SELECT * FROM voiture ORDER BY createdat DESC";
    db.query(getAllCar,(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
        }else{
            res.status(200);//ok
            res.send(result);
        }
    });
   },
   // get car by immatriculation
   getOne:(req,res)=>{
    const immatriculation=req.params.immatriculation;
    const getOneCar="SELECT * FROM voiture WHERE immatriculation=?";
    db.query(getOneCar,immatriculation,(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
        }else{
            res.status(200);//ok
            res.send(result);
        }
    });
   },

  // get last cars
   getFive:(req,res)=>{
    const getFiveCar="SELECT * FROM voiture ORDER BY createdat DESC LIMIT 4";
    db.query(getFiveCar,(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
            }else{
                res.status(200);//ok
                res.send(result);
            }
    });
    },
   // get user's car
   getByUser:(req,res)=>{
    const id_user=req.headers.id_user;
    const getCarByUser="SELECT * FROM voiture WHERE id_user=? ORDER BY createdat DESC";
    db.query(getCarByUser,id_user,(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
            }else{
                res.status(200);//ok
                res.send(result);
            }
    });
    },
    
    // add new car
    addCar:(req,res)=>{
        const id_user=req.headers.id_user;
	     const createdat=new Date();
         const {immatriculation,marque,tarif,couleur,nbplace}=req.body;
         const image=req.file.filename;
        const createCar="INSERT INTO voiture (immatriculation,id_user,marque,tarif,couleur,nbplace,image,createdat) VALUE (?,?,?,?,?,?,?,?)";
        db.query(createCar,[immatriculation,id_user,marque,tarif,couleur,nbplace,image,createdat],(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
                res.send({message:error.sqlMessage,add:false}); 
            }else{
            res.status(201);//Created
            res.send({result:result,add:true,message:"Voiture enregistré avec succès"});
            }
        });
    },
    //update a Car
    updateCar:(req,res)=>{
        const id_user=req.headers.id_user;
        const immatriculation=req.params.immatriculation;
        const {marque,tarif,couleur,nbplace}=req.body;
        const updateCar="UPDATE voiture SET marque=?, tarif=?, couleur=?, nbplace=? WHERE immatriculation=? AND id_user=?";
        db.query(updateCar,[marque,tarif,couleur,nbplace,immatriculation,id_user],(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
                res.send({message:error.sqlMessage,updated:false}); 
            }else{
                res.status(202);//Accepted
                res.send({result:result,updated:true,message:"Modification avec succès"});
            }
        });
    },
    //delete a car
    deleteCar:(req,res)=>{
        const id_user=req.headers.id_user;
        const immatriculation=req.params.immatriculation;
        const removeCar="DELETE FROM voiture WHERE immatriculation=? AND id_user=?";
        db.query(removeCar,[immatriculation,id_user],(error,result)=>{
            if(error){
                res.status(204); //no content
                console.log(error);
            }else{
            res.status(202);//Accepted 
            res.send(result);
            }
        });
    },
}
