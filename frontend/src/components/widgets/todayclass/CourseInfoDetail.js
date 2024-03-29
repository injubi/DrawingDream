import commonCode from "config/commonCode";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { defaultStyles, FileIcon } from "react-file-icon";
import { getOnlineClass } from "api/onlineclass";
import { errorAlert } from "modules/alert";
import { logout } from "modules/user";

const Contanier = styled.div`
  border: 4px solid #f5bd5c;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 1rem 3rem;
  margin: 0 1.5rem;

  .preiod {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .name {
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  font-size: 1rem;
  align-items: center;
  width: 100%;
  .desc {
    width: 8rem;
    font-weight: 600;
    height: 1.5rem;
    display: flex;
    align-items: center;
  }
  .content {
    display: flex;
    align-items: center;
  }
  margin-bottom: 0.75rem;
`;

const FileContainer = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  cursor: copy;
  .dropzone {
    text-align: center;
    padding: 20px;
    border: 3px dashed #eeeeee;
    background-color: ${({ theme }) => theme.widgetColor};
    color: #bdbdbd;
  }

  .files {
    margin-top: 0.5rem;
    padding: 0rem 0.5rem;
    display: flex;
    flex-wrap: wrap;

    .file {
      display: flex;
      border-radius: 5px;
      border: 1px solid #e4e4e4;
      padding: 0.2rem 0.4rem;
      margin-right: 0.5rem;
      .icon {
        width: 0.7rem;
        margin-right: 0.3rem;
      }
      .desc {
        font-size: 0.9rem;
        color: ${({ theme }) => theme.menuColor};
      }
    }
  }
`;

const Files = styled.div`
  margin-top: 1rem;
  padding: 0.5rem 2.5rem;
  border: 1px solid #dadde6;
  border-radius: 5px;
  margin-bottom: 0.5rem;

  .fileItem {
    display: flex;
    height: 1.5rem;
    align-items: center;
    .icon {
      width: 1rem;
      margin-right: 0.2rem;
    }
    .file {
      cursor: pointer;
      display: block;
      border: none;
      color: ${({ theme }) => theme.menuColor};
      background-color: ${({ theme }) => theme.widgetColor};
      &:hover {
        color: #000000;
      }
    }
  }
`;

const NullSubject = styled.div`
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const CourseInfoDetail = ({
  periodCode,
  courseInfo,
  files,
  setFiles,
  courseId,
}) => {
  const periodIndex = periodCode ? periodCode.slice(2, 3) : null;
  const subjectCode = courseInfo ? courseInfo.subjectCode : null;
  const { userCode } = useSelector((state) => state.user);
  const { period } = useSelector((state) => state.timetable);
  const [isLoading, setIsLoading] = useState(true);
  const [filesUrl, setFilesUrl] = useState({});
  const dispatch = useDispatch();
  // 수업 자료 조회

  useEffect(() => {
    if (
      isLoading &&
      courseId &&
      userCode === "A04" &&
      courseInfo.onlineClassId
    ) {
      getOnlineClass(courseId)
        .then((res) => {
          setFilesUrl(res.data.files);
          setIsLoading(false);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            errorAlert(401);
            dispatch(logout());
          } else {
            errorAlert(e.response.status, "수업을 불러오지 못했습니다.");
          }
        });
    }
  }, [isLoading]);
  // 수업 자료 조회 END

  // 파일 이미지 만들기 위한 확장자 생성 코드
  const makeExtension = (fileName) => {
    let fileLength = fileName.length;
    let fileDot = fileName.lastIndexOf(".");
    let fileExtension = fileName
      .substring(fileDot + 1, fileLength)
      .toLowerCase();
    return fileExtension;
  };
  // END
  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles.map((file) => file));
  };
  const onDownload = (e) => {
    window.open(e.target.value);
  };
  if (subjectCode) {
    return (
      <Contanier>
        <div className="preiod">
          {commonCode[periodCode.substr(0, 1)][periodCode]}
        </div>
        <div className="name">
          {
            commonCode[subjectCode.substr(0, 1)][subjectCode.substr(0, 3)][
              subjectCode
            ]
          }
        </div>
        {courseInfo && period[periodIndex] && (
          <>
            <InfoContainer>
              <div className="desc">교사명</div>
              <div className="content">{courseInfo.teacherName}</div>
            </InfoContainer>
            <InfoContainer>
              <div className="desc">수업 시간</div>
              <div className="content">
                {period[periodIndex].startTime.slice(0, 5)} ~{" "}
                {period[periodIndex].endTime.slice(0, 5)}
              </div>
            </InfoContainer>
            <InfoContainer>
              <div className="desc">수업 자료</div>
              {userCode === "A04" && Object.keys(filesUrl).length === 0 && (
                <div className="content">등록된 파일이 없습니다.</div>
              )}
            </InfoContainer>
            {!isLoading &&
              userCode === "A04" &&
              Object.keys(filesUrl).length > 0 && (
                <Files>
                  {Object.entries(filesUrl).map((item) => (
                    <div className="fileItem" key={item[1]}>
                      <div className="icon" value={item[1]}>
                        <FileIcon
                          extension={makeExtension(item[0])}
                          {...defaultStyles[makeExtension(item[0])]}
                        />
                      </div>
                      <button
                        className="file"
                        onClick={onDownload}
                        value={item[1]}
                      >
                        {item[0]}
                      </button>
                    </div>
                  ))}
                </Files>
              )}
            {userCode === "A03" && (
              <FileContainer>
                <Dropzone onDrop={handleDrop} className="dropzone">
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <p>첨부할 파일을 클릭 또는 드래그하여 올려주세요.</p>
                    </div>
                  )}
                </Dropzone>
                {files && (
                  <div className="files">
                    {files.map((file) => (
                      <div key={file.name}>
                        <div className="file">
                          <div className="icon">
                            <FileIcon
                              extension={makeExtension(file.name)}
                              {...defaultStyles[makeExtension(file.name)]}
                            />
                          </div>
                          <div className="desc">{file.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FileContainer>
            )}
            {/* <InfoContainer>
              <div className="desc">다시 보기</div>
              <div className="content">수업 완료 후 확인할 수 있어요</div>
            </InfoContainer> */}
          </>
        )}
      </Contanier>
    );
  } else {
    return (
      <Contanier>
        <NullSubject>
          <>
            {periodCode
              ? `${commonCode[periodCode.substr(0, 1)][periodCode]}에는 `
              : "현재는 "}
            수업이 없습니다.
          </>
        </NullSubject>
      </Contanier>
    );
  }
};

export default CourseInfoDetail;
