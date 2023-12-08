import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const HeaderStyle = css`
  width: 100%;
  height: 64px;
  background-color: #5252c9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const TitleLink = css`
  text-decoration: none;
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
      <Link to="/posts" css={TitleLink}>
        <label css={Title}>PostsAndComments</label>
      </Link>
    </header>
  );
}

export default Header;
