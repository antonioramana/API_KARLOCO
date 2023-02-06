const bcrypt=require("bcrypt");
const { response } = require("express");
const jwt=require("jsonwebtoken")
const db=require("../config/database");
const saltRounds=10;
const timeAsp=3600;

require("dotenv").config();

module.exports={

    //user register
    register:(req,res)=>{
        const {nom,prenom,email,sexe,tel,ville,province,password}=req.body;
      	const categorie="free";

        const getUserByEmail="SELECT * FROM user WHERE email=?"; //chess exist email
         db.query(getUserByEmail,email,(err,result)=>{
           
            if(err){ //if error
                res.send({err:err,message:"Mauvaise connexion à la base"});
            }

          else if(result.length>0){  //if email already exists
                res.send({message:"Cet email existe déjat"});
            }else{
               //create new user  
                const createUser="INSERT INTO user (nom,prenom,email,sexe,tel,ville,province,password,categorie) VALUE (?,?,?,?,?,?,?,?,?)";
                 bcrypt.hash(password,saltRounds,(err,hash)=>{
                    if(err){
                        console.log(err);
                    }else{
                        db.query(createUser,[nom,prenom,email,sexe,tel,ville,province,hash,categorie],(error,result)=>{
                            if(error){
                                res.status(204); //no content 
                                console.log(error.sqlMessage);
                            }else{
                            res.status(201);//Created
                            res.send({result:result,register:true,message:"Utilisateur enregistré avec succès"});
                            }
                        });
                    }

                });
        
            }
            
        });
        
    },

    //user login

    login:(req,res)=>{
            const {email,password}=req.body;
            //get user by email
            const getUserByEmail="SELECT * FROM user WHERE email=?";
            db.query(getUserByEmail,email,(err,result)=>{
                if(err){
                    res.send({err:err,message:"Problème de connexion à la base de donnée"});
                }
                //if email exists
                else if(result.length>0){
                    bcrypt.compare(password,result[0].password,(error,response)=>{//check password
                        if(response){
                            const id_user=result[0].id_user;
                            const fullName=result[0].nom+" "+result[0].prenom;
                            const email=result[0].email;
                            const token=jwt.sign({id_user},process.env.JWT_SECRET,{expiresIn:timeAsp});
                            res.json({auth:true,token:token,id_user:id_user,fullName:fullName,email:email});
                        }else{
                            res.send({auth:false,message:"Mauvais mot de passe"});
                        }
                    });
                }else{
                    res.send({auth:false,message:"Cet email n'existe pas"});
                }
            });
        },

   //user information

    getinfo:(req,res)=>{
            const id_user=req.headers.id_user;
            //get user information
            const getUserById="SELECT user.id_user, user.nom,user.prenom,user.tel,user.email,user.sexe,user.ville,user.province FROM user WHERE id_user=?";
            db.query(getUserById,id_user,(err,result)=>{
                if(err){
                   console.log(err.sqlMessage);
                }else{
                    res.status(200);
                    res.send(result);
                }
            });
        },
    //get all user

    getall:(req,res)=>{
        const id_user=req.headers.id_user;
        const getAllUser="SELECT user.id_user, user.nom,user.prenom FROM user WHERE NOT id_user=?";
        db.query(getAllUser,id_user,(err,result)=>{
            if(err){
               console.log(err.sqlMessage);
            }else{
                res.status(200);
                res.send(result);
            }
        });
    },
    //edit user's information
    updateinfo:(req,res)=>{
            const id_user=req.headers.id_user;
            const {nom,prenom,email,sexe,tel,ville,province}=req.body;
            //edit user
            const updateUser="UPDATE User SET nom=?, prenom=?,email=?,sexe=?,tel=?, ville=?,province=? WHERE id_user=?";
            db.query(updateUser,[nom,prenom,email,sexe,tel,ville,province,id_user],(error,result)=>{
                if(error){ 
                    res.send({updated:false,message:error.sqlMessage})
                    console.log(error.sqlMessage);
                }else{
                res.status(202);
                res.send({result:result,updated:true,message:"Modification avec succès"});
                }
            });
        },
  //other information

    getother:(req,res)=>{
            const user2=req.params.user2;
            const getUserById="SELECT user.id_user, user.nom,user.prenom,user.tel,user.email,user.sexe,user.ville,user.province FROM user WHERE id_user=?";
            db.query(getUserById,user2,(err,result)=>{
                if(err){
                   console.log(err.sqlMessage);
                }else{
                    res.status(200);
                    res.send(result);
                }
            });
        },

}
