const isAuthenticated =  (req, res, next) => {
    // if(req.session.email){
    //     next()
    // }else{
    //     res.render('login', { status: 'failed '})
    // }

    next();
}


const sessionValidation = (req, res, next) => {
    if(!req.session?.email){
        next()
    }else{
        res.redirect('../../api/products/list');
    }
}

export {sessionValidation, isAuthenticated}