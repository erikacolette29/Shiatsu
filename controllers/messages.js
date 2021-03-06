
const Message = require('../models/message')


module.exports = {
    index,
    create,
    show,
    reply,
    deleteMessage,
    deleteReply
}


//index page
function index(req,res){
    Message.find({})
    .then((messages) => {
        res.render("messages/index", {
            user: req.user,
            title: "Message Board",
            messages: messages.reverse()
        })
    })
}


function create(req,res){
    req.body.postedBy = req.user.name
    req.body.avatar = req.user.avatar
    Message.create(req.body)
    .then(() => {
        res.redirect('/messages')
    })
}

//show page
 function show(req,res){
     Message.findById(req.params.id)
     .then((message) =>{
        res.render("messages/show", {
            title: "Message Details", 
            user: req.user, 
            message})
     })
 }

 function reply(req,res){
     Message.findById(req.params.id)
     .then((message) => {
        req.body.postedBy = req.user.name
        req.body.avatar = req.user.avatar
        message.replies.push(req.body)
        message.save()
        .then(() =>{
        res.redirect(`/messages/${message._id}`)
     })
     })
 }


 function deleteMessage(req,res){
    Message.findByIdAndDelete(req.params.id)
    .then(() =>{
        res.redirect(`/messages`)
    })
    }
    
    
    
     function deleteReply(req,res){
        console.log(req.params)
        Message.findById(req.params.messageId)
        .then((message) => {
            const idx = message.replies.findIndex(reply => reply._id == req.params.replyId)
            message.replies.splice(idx, 1)
            message.save()
            .then(()=> {
                res.redirect(`/messages/${message._id}`)
            })
        })
    }