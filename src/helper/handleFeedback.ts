const handleFeedBack: any = (
  error: string,
  respType: any,
  showError?: boolean
) => {
  return showError === undefined
    ? error
      ? respType
      : ""
    : showError
    ? error
      ? respType
      : ""
    : "";
};

export default handleFeedBack;
