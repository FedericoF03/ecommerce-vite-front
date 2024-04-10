export default {
  getURLencoded: {
    credentials: "include",
    headers: {
      "Content-Type": "x-www-form-urlencoded",
    },
  },
  getURLJson: {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  },

  postAppJson: {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
  },
  postAppDownload: {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/pdf",
    },
  },
};
