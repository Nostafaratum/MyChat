let User = require("../model/user").User; //import User from '../model/user';

exports.get = (req, res) => {
    res.render('pages/chat', { title: 'Chat'});
}