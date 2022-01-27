package com.dd.api.service;

import java.util.UUID;

import com.dd.api.dto.request.CommunityRegisterRequestDto;
import com.dd.api.dto.request.CommunityUpdateRequestDto;
import com.dd.api.dto.response.CommunityGetListWrapperResponseDto;
import com.dd.api.dto.response.CommunityGetResponseDto;
import com.dd.db.entity.board.Community;

public interface CommunityService {

//	void registerCommunity(String accessToken, CommunityRegisterRequestDto communityRegistPostReq);
	void registerCommunity(CommunityRegisterRequestDto communityRegisterRequestDto);
//	void updateCommnunity(String accessToken, CommunityUpdateRequestDto communityUpdateRequestDto);
	void updateCommunity(CommunityUpdateRequestDto communityUpdateRequestDto);
	void plusCommunityHit(Community community);
//	Community getCommunity(String accessToken, UUID communityID);
	CommunityGetResponseDto getCommunity(UUID communityID);
//	CommunityGetListWrapperResponseDto getCommunityList(String accessToken);
	CommunityGetListWrapperResponseDto getCommunityList();
	
	String getLoginIdFromToken(String accessToken);
}
