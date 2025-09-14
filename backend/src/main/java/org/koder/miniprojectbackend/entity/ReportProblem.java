package org.koder.miniprojectbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

import java.util.Date;

@Entity
@Table(name = "reported_problems")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long pid;
    private long uid;
    private String description;
    private Point point;
    private Date date;
    private String imageUrl;
    private boolean status;
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