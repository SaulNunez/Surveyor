export default {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Surveyor",
      version: "0.1.0",
      description:
        "Backend API for Surveyor, a self-hosted survey application that allows users to create and take surveys.",
      license: {
        name: "Apache-2.0",
        url: "https://spdx.org/licenses/Apache-2.0.html",
      },
      contact: {
        name: "Saul Nunez",
        url: "https://github.com/SaulNunez/Surveyor",
        email: "saul.nunez99@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};