import styled, { css } from "styled-components";

const BaseStyles = styled.div`
  margin: 0;
  line-height: 1.2;
`;

export const fontWeightRegular = css`
  font-weight: 400;
`;

export const fontWeightSemiBold = css`
  font-weight: 600;
`;

export const fontWeightBold = css`
  font-weight: 700;
`;

export const baseTextGradent = css`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const textGradient = css`
  background: var(--primary-horizontal-gradient);
  ${baseTextGradent};
`;

export const textGradientBlue = css`
  background: var(--cyan-horizontal-gradient);
  ${baseTextGradent};
`;
export const textGradientMagenta = css`
  background: var(--magenta-horizontal-gradient);
  ${baseTextGradent};
`;

export const HeaderTitle = styled(BaseStyles)`
  color: var(--text-color);
  font-size: 66px;
  line-height: 80px;
  ${fontWeightBold}
`;

export const LargeTitle = styled(BaseStyles)`
  color: var(--highlight-text-color);
  font-size: 30px;
  line-height: 45px;
  ${fontWeightSemiBold}
`;

export const Title1 = styled(BaseStyles)`
  color: var(--secondary-text-color);
  font-size: 26px;
  line-height: 39px;
  ${fontWeightRegular}
`;

export const Title2 = styled(BaseStyles)`
  color: var(--secondary-text-color);
  font-size: 20px;
  line-height: 30px;
  ${fontWeightBold}
`;

export const Title3 = styled(BaseStyles)`
  color: var(--secondary-text-color);
  font-size: 18px;
  line-height: 27px;
  ${fontWeightRegular}
`;

export const Headline = styled(BaseStyles)`
  color: var(--highlight-text-color);
  font-size: 16px;
  line-height: 24px;
  ${fontWeightSemiBold};
`;

export const Body = styled(BaseStyles)`
  color: var(--text-color);
  font-size: 14px;
  line-height: 22px;
  ${fontWeightRegular}
`;

export const Callout = styled(BaseStyles)`
  color: var(--callout-text-color);
  font-size: 14px;
  line-height: 21px;
  ${fontWeightRegular};
`;

// export const Subhead = styled(BaseStyles)<{ bold?: boolean }>`
//   color: var(--secondary-text-color);
//   font-size: 14px;
//   line-height: 19px;
//   ${(p) => (p.bold ? fontWeightSemiBold : fontWeightRegular)}
// `;

export const Footnote = styled(BaseStyles)`
  color: var(--secondary-text-color);
  font-size: 13px;
  line-height: 16px;
  ${fontWeightRegular}
`;

export const Caption1 = styled(BaseStyles)`
  color: var(--secondary-text-color);
  font-size: 10px;
  line-height: 15px;
  ${fontWeightRegular}
`;

export const Caption2 = styled(BaseStyles)`
  color: var(--text-color);
  font-size: 9px;
  line-height: 13px;
  ${fontWeightRegular}
`;
