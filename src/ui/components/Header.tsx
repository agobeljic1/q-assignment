import { css } from "@emotion/react";

const HeaderStyle = css`
  width: 100%;
  height: 64px;
  background-color: #5252c9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const Title = css`
  color: white;
  font-weight: 500;
  font-size: 24px;
  user-select: none;
  cursor: pointer;
`;

function Header() {
  return (
    <header css={HeaderStyle}>
      <label css={Title}>PostsAndComments</label>
    </header>
  );
}

export default Header;
