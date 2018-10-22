// Setup Route Bindings
exports = module.exports = (app, nextApp) => {

    const handle = nextApp.getRequestHandler();

    app.get('/aboutus/:id', (req, res) => {
        return nextApp.render(req, res, '/aboutus', req.params);
    });
    app.get('*', handle);
    
};
