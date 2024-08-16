package org.koder.miniprojectbackend.repository;

import jakarta.transaction.Transactional;
import org.koder.miniprojectbackend.entity.ReportProblem;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReportProblemRepository extends JpaRepository<ReportProblem, Long> {
    List<ReportProblem>findAllByDepartment(String department);
    List<ReportProblem>findAllByUid(long uid);
    List<ReportProblem>findAllByStatus(boolean status);

    @Query(value = "Select * from reported_problems where ST_DistanceSphere(point,:point)< :distanceM", nativeQuery = true)
    List<ReportProblem>findAnyProblemWithinDistanceFromPoint(Point point,float distanceM);

    @Modifying
    @Transactional
    @Query(value = "UPDATE reported_problems SET status=:status WHERE pid=:pid", nativeQuery = true)
    void updateStatusOfProblem(Long pid,Boolean status);
}
