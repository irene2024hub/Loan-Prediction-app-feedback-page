import express from "express"
import mongoose from "mongoose"
import predictionModel from "./models/predictionModel.js" 
import Connect from "./Connect/connection.js"
import dotenv from "dotenv"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config()
const app = express()

const {ConnectionString} = process.env

Connect(ConnectionString)
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})
app.post("/api/prediction", async (req, res) => {
    const predictions = req.body
    const data = {
        no_of_dependents: predictions.no_of_dependents,
        education: predictions.education,
        self_employed: predictions.self_employed,
        income_annum: predictions.income_annum,
        loan_amount: predictions.loan_amount,
        loan_term: predictions.loan_term,
        cibil_score: predictions.cibil_score,
        residential_assets_value: predictions.residential_assets_value,
        commercial_assets_value: predictions.commercial_assets_value,
        luxury_assets_value: predictions.luxury_assets_value,
        bank_assets_value: predictions.bank_assets_value,
        prediction: predictions.prediction
    }

    try {
        const prediction = new predictionModel(data)
        await prediction.save()
        console.log(data)
        res.send(data)
    } catch (err) {
        console.log(err)
    }
})
app.get("/api/metrics", async (req, res) => {
    const predictions = await predictionModel.countDocuments()
    const Approved = await predictionModel.countDocuments({prediction: "Approved"})
    const Rejected = await predictionModel.countDocuments({prediction: "Rejected"})
    res.send({
        totalPredictions: predictions,
        Approved: Approved,
        Rejected: Rejected
    })
})

app.listen("3000", () => console.log("server live"))