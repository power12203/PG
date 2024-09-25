import React, { useState } from "react";

const PaymentResponseHandler = ({ response }) => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleResponse = (response) => {
    if (response.RESULT_CODE === "EC0000") {
      // 성공적으로 결제된 경우
      const { TID, APPROVNO, APPRODT, APPROTM, APPROAMT, CARD_NO } = response;

      // 예를 들어, 결제 성공 후 처리할 데이터
      const paymentDetails = {
        transactionId: TID,
        approvalNumber: APPROVNO,
        approvalDate: APPRODT,
        approvalTime: APPROTM,
        amount: APPROAMT,
        cardNumber: CARD_NO, // 마스킹된 카드 번호로 취급
      };

      // 상태 업데이트
      setPaymentStatus({
        success: true,
        details: paymentDetails,
      });

      console.log("Payment Successful:", paymentDetails);
    } else {
      // 결제 실패 시 처리
      setPaymentStatus({
        success: false,
        error: response.RESULT_MSG,
      });

      console.error("Payment Failed:", response.RESULT_MSG);
    }
  };

  // 응답이 있는 경우 처리
  if (response) {
    handleResponse(response);
  }

  return (
    <div>
      {paymentStatus &&
        (paymentStatus.success ? (
          <div>
            <h2>결제 성공</h2>
            <p>거래 ID: {paymentStatus.details.transactionId}</p>
            <p>승인 번호: {paymentStatus.details.approvalNumber}</p>
            <p>승인 금액: {paymentStatus.details.amount}</p>
            <p>카드 번호: {paymentStatus.details.cardNumber}</p>
          </div>
        ) : (
          <div>
            <h2>결제 실패</h2>
            <p>오류 메시지: {paymentStatus.error}</p>
          </div>
        ))}
    </div>
  );
};

export default PaymentResponseHandler;
