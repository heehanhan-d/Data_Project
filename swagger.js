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
    // servers: [
    //   {
    //     url: "http://localhost:8001",
    //   },
    // ],
    host: "localhost:8001",
    basePath: "/",
  },
  components: {
    res: {
      BadRequest: {
        description: "잘못된 요청입니다.",
      },
      Forbidden: {
        description: "권한이 없습니다.",
      },
      NotFound: {
        description: "없는 리소스 요청입니다.",
      },
    },
    errorResult: {
      Error: {
        type: "object",
        properties: {
          errMsg: {
            type: "string",
            description: "에러입니다.",
          },
        },
      },
    },
  },
  schemes: ["http", "https"], // 사용 가능한 통신 방식
  description: {
    "Review": {
      type: "object",
      properties: {
        userId: {
          type: "object"
        },
        guId: {
          type: "string"
        },
        dongId: {
          type: "string"
        },
        title: {
          type: "string"
        },
        content: {
          type: "string"
        },
        satisfactionLevel: {
          type: 'number'
        },
      },
    },
  },
  apis: ["./routes/*.js", "./swagger/*"],
};

const specs = swaggerJsdoc(options);

export {swaggerUi, specs};

