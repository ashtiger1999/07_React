import React, { useEffect, useState } from "react";
import { axiosApi } from "../api/axiosAPI";
import "../css/statistics.css";

export default function Statistics() {
  const [readCountData, setReadCountData] = useState(null);
  const [likeCountData, setLikeCountData] = useState(null);
  const [commentCountData, setCommentCountData] = useState(null);

  // 신규 가입 회원리스트 상태
  const [memberList, setMemberList] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // 최대 조회수 게시글 조회
  const getMaxReadCount = async () => {
    try {
      const resp = await axiosApi.get("/admin/maxReadCount");
      console.log(resp.data);

      if (resp.status === 200) {
        setReadCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 조회수 게시글 조회 중 예외 발생 : ", error);
    }
  };

  // 최대 좋아요수 게시글 조회
  const getMaxLikeCount = async () => {
    try {
      const resp = await axiosApi.get("/admin/maxLikeCount");
      console.log(resp.data);

      if (resp.status === 200) {
        setLikeCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 좋아요수 게시글 조회 중 예외 발생 : ", error);
    }
  };

  // 최대 댓글수 게시글 조회
  const getMaxCommentCount = async () => {
    try {
      const resp = await axiosApi.get("/admin/maxCommentCount");
      console.log(resp.data);

      if (resp.status === 200) {
        setCommentCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 댓글수 게시글 조회 중 예외 발생 : ", error);
    }
  };

  const getEnrollMemberList = async () => {
    try {
      const resp = await axiosApi.get("/admin/enrollMemberList");

      if (resp.status == 200) {
        setMemberList(resp.data);
      }
    } catch (error) {
      console.log("신규 가입 회원리스트 조회 중 예외 발생 : ", error);
    }
  };

  // 컴포넌트가 처음 마운트될 때 딱 1번만 실행
  // -> Statistics 컴포넌트가 화면에 마운트될 때
  // 서버로 세가지 데이터 요청, 응답 받아야함
  useEffect(() => {
    getMaxReadCount();
    getMaxLikeCount();
    getMaxCommentCount();
    getEnrollMemberList();
  }, []); // 의존성 배열이 비어있기 때문에 1번만 실행

  // readCountData, likeCountData, commentCountData에 변화가 감지될 때
  useEffect(() => {
    if (
      readCountData != null &&
      likeCountData != null &&
      commentCountData != null &&
      memberList != null
    ) {
      setIsLoading(false);
    }
  }, [readCountData, likeCountData, commentCountData, memberList]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <section className="statistics-section">
          <h2> 신규 가입 회원({memberList.length})</h2>
          <h3>[7일 이내 가입 회원]</h3>
          <table>
            <thead>
              <tr>
                <th>회원번호</th>
                <th>이메일</th>
                <th>닉네임</th>
                <th>가입일</th>
              </tr>
            </thead>

            <tbody>
              {memberList.map((member, index) => (
                <tr key={index}>
                  <td>{member.memberNo}</td>
                  <td>{member.memberEmail}</td>
                  <td>{member.memberNickname}</td>
                  <td>{member.enrollDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="statistics-section">
          <h2>가장 조회수 많은 게시글</h2>
          <p>게시판 종류 : {readCountData.boardName}</p>
          <p>게시글 번호 : No.{readCountData.boardNo}</p>
          <p>제목 : {readCountData.boardTitle}</p>
          <p>게시글 조회 수 : {readCountData.readCount}</p>
          <p>작성자 닉네임 : {readCountData.memberNickname}</p>
        </section>

        <section className="statistics-section">
          <h2>가장 좋아요 많은 게시글</h2>
          <p>게시판 종류 : {likeCountData.boardName}</p>
          <p>게시글 번호 : No.{likeCountData.boardNo}</p>
          <p>제목 : {likeCountData.boardTitle}</p>
          <p>게시글 좋아요 수 : {likeCountData.likeCount}</p>
          <p>작성자 닉네임 : {likeCountData.memberNickname}</p>
        </section>

        <section className="statistics-section">
          <h2>가장 댓글 많은 게시글</h2>
          <p>게시판 종류 : {commentCountData.boardName}</p>
          <p>게시글 번호 : No.{commentCountData.boardNo}</p>
          <p>제목 : {commentCountData.boardTitle}</p>
          <p>게시글 댓글 수 : {commentCountData.commentCount}</p>
          <p>작성자 닉네임 : {commentCountData.memberNickname}</p>
        </section>
      </div>
    );
  }
}
