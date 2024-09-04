const notFound = (err, req, res, next) => {
    
    const statusCode = res.statusCode
    res.status(statusCode).json({ message: err.message })

}

const errorHandler = (req, res, next) => {
    
    const error = new Error(`Not Found : ${req.originalUrl}`)
    res.status(404)
    next(error)
}

module.exports = {
    notFound,
    errorHandler
}
