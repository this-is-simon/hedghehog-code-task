import styled, { css } from "styled-components";
import { smallScreenAndBelow } from "../mediaQuery";

interface Props {
  children: React.ReactNode;
}
export const PageLayout = ({ children }: Props) => (
  <PageContainer>
    <PageContent>{children}</PageContent>
  </PageContainer>
);

const PageContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: var(--spacing-xxl) var(--spacing-xl);
  ${smallScreenAndBelow(
    css`
      padding: var(--spacing-xl) var(--spacing-xxs);
    `
  )};
`;

const PageContent = styled.div`
  max-width: 1000px;
  width: 100%;
`;
