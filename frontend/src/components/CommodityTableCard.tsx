import React from "react";
import "../styles/CommodityTableCard.scss";

export type Row = {
  name: string;        // 상품명
  month: string;       // 월물 (예: '25-12')
  unit: string;        // 단위 (예: '센트/파운드')
  price: number;       // 현재가
  diff: number;        // 전일비 (절대값, +상승 / -하락 / 0보합)
  rate: number;        // 등락률 (예: 0.57 => 0.57%)
  baseDate: string;    // 기준일 (YYYY.MM.DD)
  exchange: string;    // 거래소 (CBOT/ICE 등)
};

interface Props {
  title?: string;
  rows: Row[];
}

const nf = new Intl.NumberFormat("en-US");
const pf = (v: number) => `${(v >= 0 ? "+" : "")}${v.toFixed(2)}%`;

const CommodityTableCard: React.FC<Props> = ({ title = "원자재 시세", rows }) => {
  return (
    <div className="card commodityTableCard" role="region" aria-label={title}>
      <div className="cardHeader">
        <h3>{title}</h3>
      </div>

      <div className="cardBody">
        <table className="cTable">
          <thead>
            <tr>
              <th>상품명</th>
              <th>월물</th>
              <th>단위</th>
              <th className="num">현재가</th>
              <th className="num">전일비</th>
              <th className="num">등락률</th>
              <th>기준일</th>
              <th>거래소</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="empty" colSpan={8}>데이터가 없습니다</td>
              </tr>
            ) : (
              rows.map((r, i) => {
                const dir = r.diff > 0 ? "up" : r.diff < 0 ? "down" : "flat";
                return (
                  <tr key={i}>
                    <td className="name">{r.name}</td>
                    <td>
                      <span className="badge">{r.month}</span>
                    </td>
                    <td className="unit">{r.unit}</td>

                    <td className="num">{nf.format(r.price)}</td>

                    <td className={`num delta ${dir}`} aria-label={`전일비 ${r.diff}`}>
                      <i aria-hidden="true" />
                      <span>{nf.format(Math.abs(r.diff))}</span>
                    </td>

                    <td className={`num rate ${dir}`} aria-label={`등락률 ${pf(r.rate)}`}>
                      <i aria-hidden="true" />
                      <span>{pf(Math.abs(r.rate))}</span>
                    </td>

                    <td className="date">{r.baseDate}</td>
                    <td className="ex">{r.exchange}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommodityTableCard;