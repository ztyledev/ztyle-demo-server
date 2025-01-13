// model
const notificationModel = require('../models/notificationModel')

const removeOldNots = async (id) => {

    try {
        const currentNots = await notificationModel.find({ receiverId: id })
        
        //access yesterday
        var d = new Date()
        d.setDate(d.getDate() - 1)
        
        // remove notifications prior to yesterday
        let i
        for (i = 0; i < currentNots.length; i++){
            if (currentNots[i].createdAt <= d) {
                await notificationModel.findByIdAndDelete(currentNots[i]._id)
            }

        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports =removeOldNots