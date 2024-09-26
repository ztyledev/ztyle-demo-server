const dateExtractor = (date) => {
    
    let checkDate = date.toISOString().substring(0, 10)    

    return new Date(checkDate)

    
}

module.exports = dateExtractor