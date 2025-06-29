import {connect} from "mongoose"

const Connect = (connectionString) => {
    try {
        connect(connectionString)
        console.log("DB connected")
    }
    catch (err) {
        console.log(err)
    }
}

export default Connect