import React, { useEffect, useState } from "react";
import { axiosApi } from "./../api/axiosAPI";

export default function Manager() {
  // 이메일, 닉네임, 전화번호
  // 객체 하나로 상태 관리하는 방식
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    tel: "",
  });

  // 관리자 계정 목록
  const [adminList, setAdminList] = useState(null);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  // 관리자 계정 목록 조회 함수
  const getAdminList = async () => {
    try {
      const response = await axiosApi.get("/admin/selectAdminList");

      if (response.status == 200) {
        setAdminList(response.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  // userEffect
  useEffect(() => {
    getAdminList();
  }, []);

  useEffect(() => {
    if (adminList != null) {
      setIsLoading(false);
    }
  }, [adminList]);

  // 객체 형태 상태 변경 함수
  const handleChange = (e) => {
    // 대상의 id 속성값, value 값을 꺼내옴
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 관리자 계정 발급
  async function createAdminAccount() {
    // form 이라는 상태 안에 있는 값들을 하나씩 꺼내오기
    const { email, nickname, tel } = form;

    if (email.length === 0 || nickname.length === 0 || tel.length === 0) {
      alert("모든 필드를 입력해 주세요");
      return;
    }

    try {
      const response = await axiosApi.post("/admin/createAdminAccount", {
        memberEmail: email,
        memberNickname: nickname,
        memberTel: tel,
      });

      if (response.status == 201) {
        // 서버에서 응답해준 데이터 (body)
        const result = response.data;
        alert(
          `발급된 비밀번호는 ${result} 입니다. 다시 확인할 수 없으니 저장해주시길 바랍니다.`
        );
        console.log(result);
      }

      // 입력 필드 초기화
      setForm({
        email: "",
        nickname: "",
        tel: "",
      });

      // 관리자 목록 렌더링
      getAdminList();
    } catch (error) {
      alert(error.response.data);
      // 409일 때, 500일 때 응답받은 body 내용이 반용되어 alert를 출력할 수 있게끔 함
    }
  }

  return (
    <>
      <div className="manager-div">
        <section className="manager-section">
          <h2>관리자 계정 발급</h2>
          <table>
            <tbody>
              <tr>
                <td>사용할 이메일 : </td>
                <td>
                  <input
                    id="email"
                    type="email"
                    placeholder="ex) admin2@kh.or.kr"
                    onChange={handleChange}
                    value={form.email}
                  />
                </td>
              </tr>
              <tr>
                <td>사용할 이름 : </td>
                <td>
                  <input
                    id="nickname"
                    type="text"
                    placeholder="ex) 관리자2"
                    onChange={handleChange}
                    value={form.nickname}
                  />
                </td>
              </tr>
              <tr>
                <td>사용할 전화번호 : </td>
                <td>
                  <input
                    id="tel"
                    type="text"
                    placeholder="ex) 01012341234"
                    onChange={handleChange}
                    value={form.tel}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button className="issueBtn" onClick={createAdminAccount}>
            발급
          </button>
        </section>

        <section className="manager-section">
          <h2>관리자 계정 목록</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <AdminListView adminList={adminList} />
          )}
        </section>
      </div>
    </>
  );
}

const AdminListView = ({ adminList }) => {
  return adminList.length == 0 ? (
    <p>조회 결과가 없습니다.</p>
  ) : (
    <table className="manager-list-table" border={1}>
      <thead>
        <tr>
          <th>번호</th>
          <th>이메일</th>
          <th>관리자명</th>
        </tr>
      </thead>
      <tbody>
        {adminList.map((admin, index) => (
          <tr key={index}>
            <td>{admin.memberNo}</td>
            <td>{admin.memberEmail}</td>
            <td>{admin.memberNickname}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
