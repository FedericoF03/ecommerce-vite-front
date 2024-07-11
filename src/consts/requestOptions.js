export default {
  getBodyEncoded: {
    credentials: "include",
    headers: {
      "Content-Type": "x-www-form-urlencoded",
    },
  },
  getBodyAppJson: {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  },

  postBodyAppJson: {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
  },
  postBodyPDF: {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/pdf",
    },
  },
};
