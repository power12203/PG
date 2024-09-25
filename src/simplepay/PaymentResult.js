import React from "react";
import "./PaymentResult.css"; // 외부 CSS 파일로 스타일 분리

// 값을 포맷팅하는 함수
const formatValue = (value) => value || "";

// 공통 Input 컴포넌트
const InputField = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>
      <input
        type="text"
        className="inputField"
        value={formatValue(value)}
        readOnly
      />
    </td>
  </tr>
);

const PaymentResult = (props) => {
  const {
    RESULT_CODE,
    RESULT_MSG,
    DRESULT_CODE,
    DRESULT_MSG,
    PAY_METHOD,
    TID,
    VAN_RECV_KEY,
    ORDERNO,
    RESERVED01,
    RESERVED02,
    APPROVNO,
    APPRODT,
    APPROAMT,
    CARD_NO,
    APPROTM,
    ISSUE_CODE,
    ISSUE_NAME,
    PURCHASE_CODE,
    PURCHASE_NAME,
    NOINT,
    QUOTA_MONTHS,
    CHECKCD,
    TRBEGIN,
    TREND,
    BUY_REQAMT,
    BANK_CD,
    BANK_NM,
    ACCT_NO,
    ESCR_FLAG,
    MID,
  } = props;

  return (
    <div>
      <h1>승인 응답</h1>
      <table className="returnTable">
        <tbody>
          <InputField label="결과코드 (가맹점)" value={RESULT_CODE} />
          <InputField label="결과메시지 (가맹점)" value={RESULT_MSG} />
          <InputField label="결과코드 (사용자)" value={DRESULT_CODE} />
          <InputField label="결과메시지 (사용자)" value={DRESULT_MSG} />
          <InputField label="결제수단" value={PAY_METHOD} />
          <InputField label="거래번호" value={TID} />
          <InputField label="VAN 거래 고유키 (신용카드)" value={VAN_RECV_KEY} />
          <InputField label="주문번호" value={ORDERNO} />
          <InputField label="예약필드1" value={RESERVED01} />
          <InputField label="예약필드2" value={RESERVED02} />
        </tbody>
      </table>

      {PAY_METHOD === "신용카드" && (
        <div className="cardDetails">
          <h2>신용카드 성공시 아래 항목 필수</h2>
          <table className="returnTable">
            <tbody>
              <InputField label="승인번호" value={APPROVNO} />
              <InputField label="승인일자 (YYYYMMDD)" value={APPRODT} />
              <InputField label="승인시각 (HH24MISS)" value={APPROTM} />
              <InputField label="승인금액" value={APPROAMT} />
              <InputField label="카드번호" value={CARD_NO} />
              <InputField label="발급사 코드" value={ISSUE_CODE} />
              <InputField label="발급사명" value={ISSUE_NAME} />
              <InputField label="매입사 코드" value={PURCHASE_CODE} />
              <InputField label="매입사명" value={PURCHASE_NAME} />
              <InputField label="무이자 여부" value={NOINT} />
              <InputField label="할부 개월 수" value={QUOTA_MONTHS} />
              <InputField label="신용카드/체크카드" value={CHECKCD} />
            </tbody>
          </table>
        </div>
      )}

      {PAY_METHOD === "가상계좌" && (
        <div className="virtualAccountDetails">
          <h2>가상계좌 성공시 아래 항목 필수</h2>
          <table className="returnTable">
            <tbody>
              <InputField label="입금 시작일" value={TRBEGIN} />
              <InputField label="입금 종료일" value={TREND} />
              <InputField label="결제 금액" value={BUY_REQAMT} />
              <InputField label="선택한 은행 코드" value={BANK_CD} />
              <InputField label="선택한 은행명" value={BANK_NM} />
              <InputField label="계좌 번호" value={ACCT_NO} />
              <InputField label="에스크로 여부" value={ESCR_FLAG} />
            </tbody>
          </table>
        </div>
      )}

      {PAY_METHOD === "계좌이체" && (
        <div className="accountTransferDetails">
          <h2>계좌이체 성공시 아래 항목 필수</h2>
          <table className="returnTable">
            <tbody>
              <InputField label="상점 ID" value={MID} />
              <InputField label="선택한 은행 코드" value={BANK_CD} />
              <InputField label="선택한 은행명" value={BANK_NM} />
              <InputField label="계좌 번호" value={ACCT_NO} />
              <InputField label="에스크로 여부" value={ESCR_FLAG} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentResult;
