class NewController {

    // GET news
    index(req, res) {
        res.render('news')
    }

    show(req, res) {
        res.send('news page!!')
    }
}

module.exports = new NewController