package com.dd.api.service;

import java.util.UUID;

import com.dd.api.dto.response.CourseResponseDTO;

public interface CourseService {

	CourseResponseDTO getCourse(UUID courseId, String accessToken);

}
