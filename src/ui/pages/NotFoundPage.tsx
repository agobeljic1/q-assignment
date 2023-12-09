import withLogging from "../../hocs/loggerHoc";

function NotFoundPage() {
  return (
    <>
      <label>Page not found</label>
    </>
  );
}

export default withLogging(NotFoundPage, NotFoundPage.name);
