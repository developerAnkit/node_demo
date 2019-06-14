module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    app.post('/users', users.create);
    app.post('/comment', users.create_comment);
    app.get('/comment/:userId', users.findComments);
    app.get('/users', users.findAll);
    app.get('/users/:interests', users.findByInterests);
    app.put('/users/:userId', users.update);
    app.delete('/users/:userId', users.delete);
}