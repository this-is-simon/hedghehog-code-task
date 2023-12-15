import styled, { css } from "styled-components";

const BaseStyles = styled.div`
  margin: 0;
  line-height: 1.2;
`;

const fontWeightRegular = css`
  font-weight: 400;
`;

const fontWeightSemiBold = css`
  font-weight: 600;
`;

export const LargeTitle = styled(BaseStyles)`
  color: var(--highlight-text-color);
  font-size: 30px;
  line-height: 45px;
  ${fontWeightSemiBold}
`;

export const Headline = styled(BaseStyles)`
  color: var(--highlight-text-color);
  font-size: 16px;
  line-height: 24px;
  ${fontWeightSemiBold};
`;

export const Body = styled(BaseStyles)`
  color: var(--secondary-text-color);
  font-size: 13px;
  line-height: 16px;
  ${fontWeightRegular}
`;
