import React from "react";

const MainPage = () => {
  const handlePayment = async (payMethod) => {
    let url = "";
    let payload = {};

    if (payMethod === "SIMPLEPAY") {
      url = "https://dev-epay.kovanpay.com/paypage/common/mainFrame.pay";
      payload = {
        mid: process.env.REACT_APP_MID,
        apiKey: process.env.REACT_APP_API_KEY,
        rurl: process.env.REACT_APP_RURL,
        // SIMPLEPAY 요청에 필요한 매개변수 추가
        // 예시: amt: 1000, orderId: '123456'
        amt: "1000", // 예시로 금액을 1000으로 설정했습니다. 실제 사용 시에는 동적으로 설정하세요.
        orderId: "exampleOrder123", // 예시로 주문 ID를 설정했습니다.
        // 여기에 실제 요구되는 추가 매개변수를 삽입하세요.
      };
    } else if (payMethod === "CC_CANCEL") {
      url = "https://dev-epay.kovanpay.com/offline/cancel.pay";
      payload = {
        mid: process.env.REACT_APP_MID,
        apiKey: process.env.REACT_APP_API_KEY,
        // 카드 취소 요청에 필요한 매개변수 추가
        // 예시: cancelId: 'cancel123', amount: 1000
        cancelId: "cancel123", // 예시로 취소 ID를 설정했습니다.
        amount: "1000", // 예시로 취소 금액을 1000으로 설정했습니다.
        // 여기에 실제 요구되는 추가 매개변수를 삽입하세요.
      };
    }

    // API 요청을 수행합니다
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // 성공적인 응답을 처리합니다
        const result = await response.json();
        console.log("결제 응답:", result);
        // 결과에 따라 리디렉션 또는 처리를 수행합니다
        if (payMethod === "SIMPLEPAY") {
          window.location.href = result.redirectUrl; // 예시로 리디렉션 URL을 설정합니다.
        } else if (payMethod === "CC_CANCEL") {
          alert("카드 취소가 완료되었습니다.");
        }
      } else {
        // 오류를 처리합니다
        console.error("결제 요청 실패.");
      }
    } catch (error) {
      console.error("결제 요청 중 오류 발생:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "200px",
          height: "30px",
          borderColor: "#4c7eaf",
          borderStyle: "solid",
          borderBottom: "none",
          backgroundColor: "white",
          textAlign: "center",
          color: "#005766",
          marginTop: "50px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        [ 결제 ]
      </div>
      <div
        style={{
          width: "1000px",
          height: "100px",
          borderColor: "#4c7eaf",
          borderStyle: "solid",
          backgroundColor: "white",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "5px",
          paddingBottom: "5px",
        }}
      >
        <button
          style={{
            height: "50px",
            width: "300px",
            fontSize: "14px",
            color: "#fff",
            backgroundColor: "#4c7eaf",
            borderStyle: "none",
            cursor: "pointer",
          }}
          onClick={() => handlePayment("SIMPLEPAY")}
        >
          심플결제
        </button>
        <br />
        <button
          style={{
            height: "50px",
            width: "300px",
            fontSize: "14px",
            color: "#fff",
            backgroundColor: "#4c7eaf",
            borderStyle: "none",
            cursor: "pointer",
          }}
          onClick={() => handlePayment("CC_CANCEL")}
        >
          신용카드 취소
        </button>
      </div>
    </div>
  );
};

export default MainPage;
