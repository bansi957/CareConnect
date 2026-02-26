const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        // doctors: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Doctor"
        // }],
        status: {
            type: String,
            // required: true,
        },
        image: {
            type: String,
            // required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
        hospitalCategory: {
            type: String,
            required: true,
        },
        registrationNumber: {
            type: Number,
            required: true,
        },
        noOfDoctors: {
            type: Number,
            default: 0,
        },
        totalBeds: {
            type: Number,
            default: 0,
        },
        availableBeds: {
            type: Number,
            default: 0,
        },
        totalPatients: {
            type: Number,
            default: 0,
        },
        availablePatients: { type: Number, default: 0 },
        workingHours: {
            type: String,
            // required: true,
        },
    },
    { timestamps: true },
);

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
