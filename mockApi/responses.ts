const responses = [
  {
    urls: ["/api/quotes"],
    code: "error",
    httpStatus: 500,
    respone: {
      code: "error-quotes",
      message: "Unable to get data. ",
    },
  },
  {
    urls: ["/api/users/me"],
    code: "error-user",
    httpStatus: 500,
    respone: {
      code: "error-user",
      message: "Unable to get user data. ",
    },
  },
];

export default responses;
