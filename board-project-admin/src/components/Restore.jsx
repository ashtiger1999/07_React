import React, { useEffect, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

export default function Restore() {
  const [withdrawnMembers, setWithdrawnMembers] = useState(null); // 탈퇴 회원 목록
  const [deleteBoards, setDeleteBoards] = useState(null); // 삭제 게시글 목록
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 탈퇴한 회원 목록 조회용 함수
  const getWithdrawnMemberList = async () => {
    try {
      const resp = await axiosApi.get("/admin/withdrawnMemberList");

      if (resp.status == 200) {
        setWithdrawnMembers(resp.data);
      }
    } catch (error) {
      console.log("탈퇴 회원 목록 조회 중 에러 발생 : ", error);
    }
  };

  // 탈퇴한 회원 복구 요청 함수
  const restoreMember = async (member) => {
    if (
      window.confirm(member.memberNickname + "님을 탈퇴 복구 시키겠습니까?")
    ) {
      try {
        const resp = await axiosApi.put("/admin/restoreMember", {
          memberNo: member.memberNo,
        });
        if (resp.status == 200) {
          alert("복구되었습니다.");
          getWithdrawnMemberList();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 삭제된 게시글 목록 조회용 함수
  const getDeleteBoardList = async () => {
    try {
      const resp = await axiosApi.get("/admin/deleteBoardList");

      if (resp.status == 200) {
        setDeleteBoards(resp.data);
        console.log(resp.data);
      }
    } catch (error) {
      console.log("삭제된 게시글 목록 조회 중 에러 발생 : ", error);
    }
  };

  // 삭제된 게시글 복구 요청 함수
  const restoreBoard = async (board) => {
    if (window.confirm(board.boardNo + "번 게시글을 삭제 복구 시키겠습니까?")) {
      try {
        const resp = await axiosApi.put("/admin/restoreBoard", {
          boardNo: board.boardNo,
        });
        if (resp.status == 200) {
          alert("복구되었습니다.");
          getDeleteBoardList();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Restore 컴포넌트가 처음 렌더링 될 때
  useEffect(() => {
    getWithdrawnMemberList();
    getDeleteBoardList();
  }, []);

  // withdrawnMembers, deleteBoards 상태가 변경될때 실행(isLoading 값 변경)
  useEffect(() => {
    if (withdrawnMembers != null && deleteBoards != null) {
      setIsLoading(false);
    }
  }, [withdrawnMembers, deleteBoards]);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  } else {
    return (
      <div className="menu-box">
        <RestoreMember
          withdrawnMembers={withdrawnMembers}
          restoreMember={restoreMember}
        />

        <RestoreBoard deleteBoards={deleteBoards} restoreBoard={restoreBoard} />
      </div>
    );
  }
}

const RestoreMember = ({ withdrawnMembers, restoreMember }) => {
  return (
    <section className="section-border">
      <h2>탈퇴 회원 복구</h2>

      <h3>탈퇴한 회원 목록</h3>

      {withdrawnMembers.length == 0 ? (
        <p>탈퇴한 회원이 없습니다.</p>
      ) : (
        withdrawnMembers.map((member, index) => {
          return (
            <ul className="ul-board" key={index}>
              <li>회원 번호 : {member.memberNo}</li>
              <li>회원 이메일 : {member.memberEmail}</li>
              <li>회원 닉네임 : {member.memberNickname}</li>
              <button
                className="restoreBtn"
                onClick={() => restoreMember(member)}
              >
                RESTORE
              </button>
            </ul>
          );
        })
      )}
    </section>
  );
};

const RestoreBoard = ({ deleteBoards, restoreBoard }) => {
  return (
    <section className="section-border">
      <h2>삭제 게시글 복구</h2>

      <h3>삭제된 게시글 목록</h3>

      {deleteBoards.length == 0 ? (
        <p>삭제된 게시글이 없습니다.</p>
      ) : (
        deleteBoards.map((board, index) => {
          return (
            <ul className="ul-board" key={index}>
              <li>게시글 번호 : {board.boardNo}</li>
              <li>게시글 카테고리명 : {board.boardName}</li>
              <li>게시글 제목 : {board.boardTitle}</li>
              <li>회원 닉네임 : {board.memberNickname}</li>
              <button
                className="restoreBtn"
                onClick={() => restoreBoard(board)}
              >
                RESTORE
              </button>
            </ul>
          );
        })
      )}
    </section>
  );
};
