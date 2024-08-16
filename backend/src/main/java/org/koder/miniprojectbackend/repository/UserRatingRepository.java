package org.koder.miniprojectbackend.repository;

import org.koder.miniprojectbackend.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRatingRepository extends JpaRepository<Rating,Long> {
}
