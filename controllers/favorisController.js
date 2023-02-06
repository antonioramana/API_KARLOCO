const db=require("../config/database");

module.exports={
    //get user's favorite car
    get:(req,res)=>{
     const id_user=req.headers.id_user;   
    const getFavoris="SELECT favoris.id_fav,voiture.immatriculation,voiture.image,voiture.nbplace,voiture.couleur,voiture.marque,voiture.tarif FROM voiture,user,favoris WHERE user.id_user=favoris.id_user AND voiture.immatriculation=favoris.immatriculation AND favoris.id_user=? ORDER BY voiture.createdat DESC";
    db.query(getFavoris,id_user,(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
        }else{
            res.status(200);//ok
            res.send(result);
        }
    });
   },
    //add car into favorite
    addFavoris:(req,res)=>{
        const id_user=req.headers.id_user; 
        const {immatriculation}=req.body;
        const createFavoris="INSERT INTO favoris (immatriculation,id_user) VALUE (?,?)";
        db.query(createFavoris,[immatriculation,id_user],(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
                res.send({created:false,message:error.sqlMessage});
            }else{
            res.status(201);//Created
            res.send({result:result,created:true,message:"Voiture ajoutée aux favoris avec succès"});
            }
        });
    },
    //delete car into favorite
    deleteFavoris:(req,res)=>{
        const immatriculation=req.params.immatriculation;
        const id_user=req.headers.id_user;
        const removeFavoris="DELETE FROM favoris WHERE immatriculation=? and id_user=?";
        db.query(removeFavoris,[immatriculation,id_user],(error,result)=>{
            if(error){
                console.log(error);
                res.send({delete:false,message:error.sqlMessage});
            }else{
            res.status(202);//Accepted 
            res.send({result:result,delete:true,message:"Voiture supprimée aux favoris"});
            }
        });
    },
}
