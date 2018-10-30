var path = require('path')

module.exports = function(app) {
    app.get('/savedarticles', function(req, res){
        res.sendFile(path.join(__dirname, '../public/savedarticles.html'))
    })
}