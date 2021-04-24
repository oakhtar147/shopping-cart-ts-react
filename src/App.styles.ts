import styled from "styled-components";

import { IconButton } from "@material-ui/core";

export const Wrapper = styled.div`
  margin: 40px;
`;

export const CartButton = styled(IconButton)`
  position: absolute;
  z-index: 42;
  top: 20px;
  right: 20px;
`;
