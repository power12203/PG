import React, { useState } from "react";

const CardCancelRequest = () => {
  const [formData, setFormData] = useState({
    MID: process.env.REACT_APP_MID,
    PAY_METHOD: "CC",
    TID: "",
    CANCEL_AMT: "5000",
    RESERVED01: "가맹점예약필드 1",
    RESERVED02: "가맹점예약필드 2",
    TAX_YN: "",
    TAX_AMT: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const response = await fetch(
        "https://dev-epay.kovanpay.com/offline/cancel.pay",
        {
          method: "POST",
          body: form,
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );

      const result = await response.json();
      console.log("Response:", result);

      if (result.RESULT_CODE === "0000") {
        // 결과 코드에 따라 확인
        alert("취소가 완료되었습니다.");
      } else {
        alert(`취소 처리 중 오류가 발생했습니다: ${result.RESULT_MSG}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h2>신용카드 결제 취소</h2>
      <form
        id="form_kftc_payment"
        name="form_kftc_payment"
        method="post"
        onSubmit={handleSubmit}
      >
        <table>
          <tbody>
            {Object.keys(formData).map((key, index) => (
              <tr key={index}>
                <td>{key}</td>
                <td>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                  />
                </td>
                <td>{key} 설명</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button type="submit">결제 취소</button>
        </div>
      </form>
    </div>
  );
};

export default CardCancelRequest;
