const express = require("express");
require("dotenv").config();
const { createClient } = require("@clickhouse/client");
const language = require("@google-cloud/language");
const credentials = require("./ai-diary-399816-dce2d0f4bcf2.json");
const crypto = require("node:crypto");
const cors = require("cors");

const client = createClient({
  host: process.env["CLICKHOUSE_HOST"],
  username: process.env["CLICKHOUSE_USERNAME"],
  password: process.env["CLICKHOUSE_PASSWORD"],
});

(async function () {
  const query = `
    CREATE TABLE IF NOT EXISTS Diary (
        ID String PRIMARY KEY,
        Message String NOT NULL,
        Entities Array(JSON) NOT NULL,
        Sentiment_Score Array(JSON) NOT NULL,
    )
    `;
  // const query = `DROP TABLE Diary;`
  await client.exec({
    query,
    clickhouse_settings: {
      wait_end_of_query: 1,
      compatibility_ignore_auto_increment_in_create_table: true,
      allow_experimental_object_type: 1,
    },
  });
})();

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hello World",
  });
});

app.get("/data", async (req, res) => {
  try {
    const query = `
    SELECT * FROM Diary;
    `;

    const rows = await client.query({
      query,
      format: "JSONEachRow",
    });

    res.status(200).json({
      success: true,
      result: await rows.json(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.post("/data", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.content) {
      res.status(400).json({
        success: false,
        error: "Bad Request",
      });
      return;
    }

    let result = await analyzeEntities(req.body.content);
    console.log(result);
    await client.insert({
      table: "Diary",
      values: [
        {
          ...result,
        },
      ],
      format: "JSONEachRow",
    });

    res.status(201).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

async function analyzeEntities(content) {
  const aiClient = new language.LanguageServiceClient({
    credentials,
  });
  const document = {
    content,
    type: "PLAIN_TEXT",
  };

  // Detects entities in the document
  const [result] = await aiClient.analyzeEntitySentiment({
    document,
  });

  console.log(result);
  let temp = result.entities.filter((e) => e.type !== "OTHER");
  return {
    ID: crypto.randomBytes(4).toString("hex"),
    Message: content,
    Entities: temp.map((e) => {
      return {
        name: e.name,
        type: e.type,
        salience: e.salience,
      };
    }),
    Sentiment_Score: temp.map((e) => {
      return {
        score: e.sentiment.score,
        magnitude: e.sentiment.magnitude,
      };
    }),
  };
}
