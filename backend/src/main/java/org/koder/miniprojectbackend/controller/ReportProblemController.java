package org.koder.miniprojectbackend.controller;

import org.koder.miniprojectbackend.entity.ReportProblem;
import org.koder.miniprojectbackend.exception.DuplicateProblemException;
import org.koder.miniprojectbackend.service.ReportProblemService;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/problem")
public class ReportProblemController {

    ReportProblemService reportProblemService;

    public ReportProblemController(ReportProblemService reportProblemService) {
        this.reportProblemService = reportProblemService;
    }

    @PostMapping
    @Transactional
    public Map<String, String> saveProblem(@RequestParam("file") MultipartFile file, @RequestParam("problem") String problem) {
        ReportProblem reportProblem = reportProblemService.saveReportedProblem(file, problem);
        if (reportProblem == null)
            throw new DuplicateProblemException("Problem Already Reported", HttpStatus.CONFLICT);
        reportProblem.setPoint(null);
        return Map.of("done", "true");
    }

    @GetMapping
    public List<ReportProblem> getAllReportedProblems() {
        return reportProblemService.getAllReportedProblems();
    }

    @GetMapping("/count/total")
    public Map<String, Long> getReportedProblemsCount() {
        Map<String, Long> mp = new HashMap<>();
        Long count = reportProblemService.reportedProblemsCount();
        mp.put("count", count);
        return mp;
    }

    @GetMapping("/count/solved")
    public Map<String, Long> getSolvedProblemsCount() {
        Map<String, Long> mp = new HashMap<>();
        Long count = reportProblemService.solvedReportedProblemsCount();
        mp.put("count", count);
        return mp;
    }

    //    @GetMapping("/{pid}")
//    public ReportProblem getReportedProblemByPid(@PathVariable("pid") Long pid){
//        return reportProblemService.getReportProblemById(pid);
//    }
    @GetMapping("/{dept}")
    public List<ReportProblem> getReportedProblemsOfDepartment(@PathVariable("dept") String department) {
        return reportProblemService.getReportedProblemsOfDepartment(department);
    }

    @PutMapping("/status/{pid}")
    public Boolean updateStatusOfReportedProblem(@PathVariable("pid") Long pid) {
        return reportProblemService.updateStatusOfReportedProblem(pid);
    }

    @GetMapping("/details/{pid}")
    public ReportProblem getDetailsOfProblem(@PathVariable("pid") Long pid) {
        return reportProblemService.getReportProblemById(pid);
    }

    @GetMapping("/timeelapsed/{pid}")
    public Map<String, String> getTimeElapsed(@PathVariable("pid") Long pid) {
        Long days = reportProblemService.getTimeElapsedOfReportProblem(pid);
        return Map.of("timeelapsed", days.toString());
    }
}
