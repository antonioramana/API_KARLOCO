const db=require("../config/database");

module.exports={
    //SELECT USER'S NOTIFICATIONS 
    get:(req,res)=>{
     const receiver=req.headers.id_user;   
    const getNotification="SELECT * FROM notification WHERE receiver=? ORDER BY createdAt DESC";
    db.query(getNotification,receiver,(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
        }else{
            res.status(200);//ok
            res.send(result);
        }
    });
   },
   //COUNT NOTIFICATION NOT DELIVRED 
   getCount:(req,res)=>{
  const receiver=req.headers.id_user;   
   const getCount="SELECT COUNT(lu) AS nbNotif FROM notification WHERE receiver=? AND lu=false";
   db.query(getCount,receiver,(error,result)=>{
       if(error){
           console.log(error.sqlMessage);
       }else{
           res.status(200);//ok
           res.send(result);
       }
   });
  },
  //CREATE A NOTIFICATION
    addNotification:(req,res)=>{
        const sender=req.headers.id_user; 
        const {receiver,content}=req.body;
        const createdAt=new Date();
        const createNotification="INSERT INTO notification (sender,receiver,content,createdAt) VALUE (?,?,?,?)";
        db.query(createNotification,[sender,receiver,content,createdAt],(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
                res.send({created:false,message:error.sqlMessage});
            }else{
            res.status(201);//Created
            res.send({result:result,created:true});
            }
        });
    },
//DELETE NOTIFICATION
    deleteNotification:(req,res)=>{
        const id_notif=req.params.id_notif;
        const receiver=req.headers.id_user;
        const removeNotification="DELETE FROM notification WHERE id_notif=? and receiver=?";
        db.query(removeNotification,[id_notif,receiver],(error,result)=>{
            if(error){
                console.log(error);
                res.send({delete:false,message:error.sqlMessage});
            }else{
            res.status(202);//Accepted 
            res.send({result:result,delete:true,message:"Notification supprimée"});
            }
        });
    },
    //SET NOTIFICATION LU TRUE
    editNotification:(req,res)=>{
        const receiver=req.headers.id_user; 
        const updateNotification="UPDATE notification SET lu=true WHERE receiver=?";
        db.query(updateNotification,[receiver],(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
                res.send({updated:false,message:error.sqlMessage});
            }else{
            res.status(201);//Created
            res.send({result:result,updated:true});
            }
        });
    },
}