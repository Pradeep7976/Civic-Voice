package org.koder.miniprojectbackend.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.koder.miniprojectbackend.entity.ReportProblem;
import org.koder.miniprojectbackend.entity.ProblemReq;
import org.koder.miniprojectbackend.exception.GeneralException;
import org.koder.miniprojectbackend.repository.ReportProblemRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.koder.miniprojectbackend.util.imageKitUtil;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
public class ReportProblemService {
    @Autowired
    private ReportProblemRepository reportProblemRepository;

    @Autowired
    private imageKitUtil imageKitUtil;

    @Autowired
    private ObjectMapper mapper;

    mailService mailService;


    public ReportProblemService(@Lazy mailService mailService) {
        this.mailService = mailService;
    }

    Logger logger = LoggerFactory.getLogger(ReportProblemService.class);

    @Transactional
    public ReportProblem saveReportedProblem(MultipartFile file, String reportProblemReqStr) {
        if (file == null || reportProblemReqStr == null) {
            throw new GeneralException("no File", null);
        }
        try {
            ProblemReq problemReq = mapper.readValue(reportProblemReqStr, ProblemReq.class);
            problemReq.setDate(new Date());
            logger.info(String.format("problem received with uid %s", problemReq.getUid()));
            if (!isProblemReported(problemReq.getLng(), problemReq.getLat())) {
                logger.info(String.format("problem already exists"));
                return null;
            }
            String imageUrl = imageKitUtil.uploadFile(file).getUrl();
            GeometryFactory geometryFactory = new GeometryFactory();
            Point point = geometryFactory.createPoint(new Coordinate(problemReq.getLng(), problemReq.getLat()));
            ReportProblem reportProblem = ReportProblem.builder().uid(problemReq.getUid()).description(problemReq.getDescription()).date(problemReq.getDate()).imageUrl(imageUrl).status(false).department(problemReq.getDepartment()).point(point).build();
            ReportProblem savedProblem = reportProblemRepository.save(reportProblem);
            mailService.sendEmailOnProblemReported(savedProblem.getPid(), problemReq.getUid());
            return savedProblem;
        } catch (Exception e) {
            e.printStackTrace();
            throw new GeneralException("error", null);
        }
    }

    private boolean isProblemReported(double lng, double lat) {
        GeometryFactory geometryFactory = new GeometryFactory();
        Point point = geometryFactory.createPoint(new Coordinate(lng, lat));
        List<ReportProblem> anyProblemWithinDistanceFromPoint = reportProblemRepository.findAnyProblemWithinDistanceFromPoint(point, 1000);
        return ((long) anyProblemWithinDistanceFromPoint.size()) <= 0;
    }

    public List<ReportProblem> getAllReportedProblems() {
        return reportProblemRepository.findAll();
    }

    public List<ReportProblem> getReportedProblemsOfDepartment(String department) {
        return reportProblemRepository.findAllByDepartment(department).stream().sorted(Comparator.comparing(ReportProblem::getDate)).toList();
    }

    public ReportProblem getReportProblemById(Long id) {
        return reportProblemRepository.findById(id).orElse(null);
    }

    public List<ReportProblem> getNoOfReportedProblemsOfUser(Long uid) {
        return reportProblemRepository.findAllByUid(uid);
    }

    public Long getTimeElapsedOfReportProblem(Long pid) {
        ReportProblem reportProblem = getReportProblemById(pid);
        if (reportProblem != null) {
            Date date = reportProblem.getDate();
            LocalDate dateLocal = date.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            return ChronoUnit.DAYS.between(dateLocal, LocalDate.now());
        } else {
            throw new GeneralException("Problem not found", null);
        }
    }

    public Long reportedProblemsCount() {
        return reportProblemRepository.count();
    }

    public Long solvedReportedProblemsCount() {
        return reportProblemRepository.findAllByStatus(true).stream().count();
    }

    public Boolean updateStatusOfReportedProblem(Long pid) {
        reportProblemRepository.updateStatusOfProblem(pid, true);
        return true;
    }

    public Long timeElapsed(Long pid) {
        Date date = null;
        ReportProblem reportProblem = getReportProblemById(pid);
        if (reportProblem != null) {
            date = reportProblem.getDate();
        }
        LocalDate today = LocalDate.now();
        LocalDate reportedDate = LocalDate.parse(date.toString());
        return ChronoUnit.DAYS.between(reportedDate, today);
    }
}
