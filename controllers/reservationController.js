const db=require("../config/database");

module.exports={
    //user's car
    getByIdOwner:(req,res)=>{
     const id_user=req.headers.id_user;
    const getByIdOwner="SELECT voiture.immatriculation,voiture.marque,voiture.tarif,voiture.couleur,voiture.nbplace,voiture.image,user.nom,user.prenom,user.id_user,reservation.dateres,reservation.id_res,reservation.heure,reservation.nbjour,reservation.lieu FROM voiture,user,reservation WHERE voiture.immatriculation=reservation.immatriculation AND voiture.id_user=? AND NOT (user.id_user=?) ORDER BY reservation.dateres DESC;";
    db.query(getByIdOwner,[id_user,id_user],(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
        }else{
            res.status(200);//ok
            res.send(result);
        }
    });
   },
   //user's reservation
   getByIdTenant:(req,res)=>{
    const id_user=req.headers.id_user;
    const getByIdTenant="SELECT voiture.immatriculation,voiture.marque,voiture.tarif,voiture.couleur,voiture.nbplace,voiture.image,user.nom,user.prenom,user.id_user,reservation.dateres,reservation.id_res,reservation.heure,reservation.nbjour,reservation.lieu FROM voiture,user,reservation WHERE voiture.immatriculation=reservation.immatriculation AND reservation.id_user=? AND NOT(user.id_user=?) ORDER BY reservation.dateres DESC;";
    db.query(getByIdTenant,[id_user,id_user],(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
            }else{
                res.status(200);//ok
                res.send(result);
            }
    });
    },
    //create  reservation
    addReservation:(req,res)=>{
        const id_user=req.headers.id_user;
        const {immatriculation,nbjour,dateres,heure,lieu}=req.body;
        const createReservation="INSERT INTO reservation (immatriculation,id_user,nbjour,dateres,heure,lieu) VALUE (?,?,?,?,?,?)";
        db.query(createReservation,[immatriculation,id_user,nbjour,dateres,heure,lieu],(error,result)=>{
            if(error){
                res.status(204); //no content 
                console.log(error.sqlMessage);
            }else{
            res.status(201);//Created
            res.send({result:result,message:"Votre réservation a été bien effectué"});
            }
        });
    },
    //remove reservation
    deleteReservation:(req,res)=>{
        const id_user=req.headers.id_user;
        const id_res=req.params.id_res;
        const removeReservation="DELETE FROM reservation WHERE id_res=? and id_user=?";
        db.query(removeReservation,[id_res,id_user],(error,result)=>{
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