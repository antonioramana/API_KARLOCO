const db=require("../config/database");

module.exports={

    // get user's message
    getMessage:(req,res)=>{
     const user1=req.headers.id_user;   
     const user2=req.params.user2;   
    const getMessage="SELECT * FROM message WHERE id_conv IN (SELECT id_conv FROM conversation WHERE (user1=? AND user2=?) OR (user1=? AND user2=?)) ORDER BY datemes ASC";
    db.query(getMessage,[user1,user2,user2,user1],(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
        }else{
            res.status(200);//ok
            res.send(result);
        }
    });
   },
    // count message not read
    getCount:(req,res)=>{
        const id_user=req.headers.id_user;   
       const getCount="SELECT COUNT(lu) AS nbNew FROM message, conversation WHERE (message.sender=conversation.user1 OR message.sender=conversation.user2) AND lu=false AND NOT (message.sender=?) AND (conversation.user1=? OR conversation.user2=?)";
       db.query(getCount,[id_user,id_user,id_user],(error,result)=>{
           if(error){
               console.log(error.sqlMessage);
           }else{
               res.status(200);//ok
               res.send(result);
           }
       });
      },
   // get user's conversation 
   getConversation:(req,res)=>{
    const id_user=req.headers.id_user;
    const getConv="SELECT user.id_user,user.nom,user.prenom,message.datemes,message.text,conversation.id_conv,conversation.user1,conversation.user2 FROM user,message,conversation WHERE (user.id_user=conversation.user1 OR user.id_user=conversation.user2) AND message.id_conv=conversation.id_conv AND message.last=true AND (conversation.user1=? OR conversation.user2=?) ORDER BY message.datemes DESC";
    db.query(getConv,[id_user,id_user],(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
        }else{
            res.status(200);//ok
            res.send(result);
        }
    });
   },

   // add new message and conversation
    addMessage:(req,res)=>{
        const id_user=req.headers.id_user;
        const createdAt=new Date();
        const {user1,user2,sender,text}=req.body;
        if(user1==id_user || user2==id_user){
        const getConv="SELECT id_conv FROM conversation WHERE (user1=? AND user2=?) OR (user2=? AND user1=?) ";
        db.query(getConv,[user1,user2,user1,user2],(error,result)=>{
                if(error){
                    console.log(error.sqlMessage);
                }else{
                    if(result.length>0){
                        const id_conv=result[0].id_conv;
                        const createMessage="INSERT INTO message (id_conv,sender,text,datemes) VALUE (?,?,?,?)";
                        db.query(createMessage,[id_conv,sender,text,createdAt],(error,result)=>{
                            if(error){
                                console.log(error.sqlMessage);
                                res.send({message:error.sqlMessage,add:false}); 
                            }else{
                            res.status(201);//Created
                            res.send({result:result,add:true,message:"Message envoyé avec succès"});
                            }
                        });
                    }else{
                        const id_conv=user1+" "+(Math.floor(Math.random() * 100000) + 1)+" "+user2;
                        const createConversation="INSERT INTO conversation (id_conv,user1,user2,createdAt) VALUE (?,?,?,?)";
                        db.query(createConversation,[id_conv,user1,user2,createdAt],(error,result)=>{
                            if(error){
                                console.log(error.sqlMessage);
                                res.send({message:error.sqlMessage,add:false}); 
                            }else{
                                const createMessage="INSERT INTO message (id_conv,sender,text,datemes) VALUE (?,?,?,?)";
                                db.query(createMessage,[id_conv,sender,text,createdAt],(error,result)=>{
                                    if(error){
                                        console.log(error.sqlMessage);
                                        res.send({message:error.sqlMessage,add:false}); 
                                    }else{
                                    res.status(201);//Created
                                    res.send({result:result,add:true,message:"Message envoyé avec succès"});
                                    }
                                });         
                            }
                        });
                    }
                }
        });
    }
    },

    //update read message
    updateLu:(req,res)=>{
        const id_user=req.headers.id_user;
        const updateLu="UPDATE message SET lu=true WHERE id_conv IN (SELECT id_conv FROM conversation WHERE user1=? OR user2=?);";
        db.query(updateLu,[id_user,id_user],(error,result)=>{
            if(error){
                console.log(error.sqlMessage);
                res.send({message:error.sqlMessage,updated:false}); 
            }else{
                res.status(202);//Accepted
                res.send({result:result,updated:true,message:"Modification avec succès"});
            }
        });
    },
    
    //update last message
   updateLast:(req,res)=>{
            const user1=req.headers.id_user; 
            const user2=req.params.user2;
            const updateLast="UPDATE message SET last=false  WHERE id_conv IN (SELECT id_conv FROM conversation WHERE (user1=? AND user2=?) OR (user1=? AND user2=?))";
            db.query(updateLast,[user1,user2,user2,user1],(error,result)=>{
                if(error){
                    console.log(error.sqlMessage);
                    res.send({message:error.sqlMessage,updated:false}); 
                }else{
                    res.status(202);//Accepted
                    res.send({result:result,updated:true,message:"Modification avec succès"});
                }
            });
        },
    // //delete a message
     deleteMessage:(req,res)=>{
        const id_user=req.headers.id_user; 
        const id_mess=req.params.id_mess;
        const removeMessage="DELETE FROM message WHERE id_mes=? AND id_conv IN (SELECT id_conv FROM conversation WHERE user1=? OR user2=?)";
        db.query(removeMessage,[id_mess,id_user,id_user],(error,result)=>{
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
