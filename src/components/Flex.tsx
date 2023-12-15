import styled from "styled-components";

interface FlexProps {
  gap?: string;
  flex?: number;
  direction?: string;
  align?: string;
  justify?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  gap: ${(props) => props.gap};
  flex: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "center"};
`;
