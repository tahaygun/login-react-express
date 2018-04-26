const usersController = require("../controller/usersController");
const authUser= usersController.authenticateUser;
module.exports= function (app) {
    app.get('/ping', (req,res)=>res.send('poing'));

    app.post('/api/register', usersController.createUser );

    app.get("/api/users/", authUser,  usersController.getAllUsers);
    
    app.get("/api/users/:userId", authUser,  usersController.findUser);

    app.post("/api/login", usersController.loginUser);
    app.get("/api/currentUser", usersController.currentUser)
    app.get("/api/session", (req, res)=>res.json({session:req.session.user}))

    app.get("/api/logout", (req, res)=>{
        req.session.destroy((err)=>{
           if(err) {
            console.log({err:true, message:"Logout is failed"}) 
            return next
        }
        res.json({ok:true});
        })
    }) 

    app.post("/api/*", (req,res)=>res.json({error:true, message: "Server error"}));
    
}