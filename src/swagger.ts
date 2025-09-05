export default {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Surveyor",
      version: "0.1.0",
      description:
        "Backend API for Surveyor, a self-hosted survey application that allows users to create and take surveys.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Saul Nunez",
        url: "https://saulnunez.com",
        email: "saul.nunez99@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};