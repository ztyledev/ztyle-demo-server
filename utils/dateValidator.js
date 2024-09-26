
const dateExtractor =require('./dateExtractor')

const dateValidator = (date) => {
    
    const givenDate =dateExtractor(new Date(date))
    const toDate = dateExtractor(new Date())

    if (givenDate < toDate) {
        return false
    }
    return true

}

module.exports = dateValidator
