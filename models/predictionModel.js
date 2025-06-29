import {Schema, model} from "mongoose"

const predictionSchema = new Schema({
    no_of_dependents: Number,
    education: String,
    self_employed: String,
    income_annum: Number,
    loan_amount: Number,
    loan_term: Number,
    cibil_score: {type: Number, min: 250, max: 900},
    residential_assets_value: Number,
    commercial_assets_value: Number,
    luxury_assets_value: Number,
    bank_assets_value: Number,
    prediction: String,
    date: {type: Date, default: Date.now}
})

const predictionModel = model("Prediction", predictionSchema)

export default predictionModel