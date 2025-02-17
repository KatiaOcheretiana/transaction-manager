// App.styled.js

import { Box } from "@chakra-ui/react";
import styled from "styled-components";

export const BoxWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 0 auto;
  width: 60%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;
