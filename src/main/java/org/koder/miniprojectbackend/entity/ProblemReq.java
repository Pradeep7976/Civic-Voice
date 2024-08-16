package org.koder.miniprojectbackend.entity;

import lombok.Data;

import java.sql.Date;

@Data
public class ProblemReq {
    private long uid;
    private String description;
    private double lng;
    private double lat;
    private Date date;
    private String department;
}

//13.363147927424132, 77.10319509392082

//const mongoose = require("mongoose");
//
//const newSchema = mongoose.Schema({
//    pid: { type: Number, required: true },
//    uid: { type: Number, required: true },
//
//    description: { type: String, required: false },
//    locx: { type: Number, required: true },
//    locy: { type: Number, required: true },
//    date: { type: Date, default: Date.now, required: true },
//    formatdate: { type: Date, default: Date.now, required: true },
//    imageurl: { type: String, required: false },
//    status: { type: Boolean, default: false },
//    department: { type: String, required: true },
//});
//
//module.exports = mongoose.model("reportproblem", newSchema);