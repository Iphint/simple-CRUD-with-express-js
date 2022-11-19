const axios = require('axios')
exports.homeRoutes = (req,res) => {
   // make a request to API
   axios.get('http://localhost:5000/api/users')
   .then((response) => {
      res.render('index', {users: response.data})
   })
   .catch((err) => {
      res.send(err)
   })
}
exports.addUser = (req,res) => {
   res.render('add_user')
}
exports.updateUser = (req,res) => {
   axios.get('http://localhost:5000/api/users', {params: {id:req.query.id}})
   .then(function(update) {
      res.render('update_user', {user: update.data})
   })
   .catch((err) => {
      res.send(err.message)
   })
}