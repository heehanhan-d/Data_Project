import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "NineLab API doc",
      description: "NineLab API 문서입니다.",
    },
    servers: [
      {
        url: "http://localhost:8001",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

export {swaggerUi, specs};

    
