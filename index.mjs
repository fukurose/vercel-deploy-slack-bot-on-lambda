import querystring from "querystring";

import { postRequest } from "./http.mjs";
import { blocks } from "./slack.mjs";

export async function handler(event) {
  const contentType = event.headers["content-type"];

  if (contentType == "application/json") {
    await handleJSON(event.body);
  } else if (contentType == "application/x-www-form-urlencoded") {
    await handleUrlEncoded(event.body);
  }

  const response = {
    statusCode: 200,
    body: "Hello!",
  };
  return response;
}

const handleUrlEncoded = async (requestBody) => {
  const queryParameter = Buffer.from(requestBody, "base64").toString();
  const body = querystring.parse(queryParameter);
  const payload = JSON.parse(body.payload);
  console.log(JSON.stringify(payload));

  const headers = {
    "Content-Type": "application/json",
  };

  const result = handleAction(payload);
  const data = {
    text: result,
  };
  await postRequest(payload.response_url, headers, JSON.stringify(data));
};

const handleJSON = async (requestBody) => {
  const body = JSON.parse(requestBody);

  if (body.challenge) {
    const responseBody = {
      challenge: body.challenge,
    };
    const response = {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
    return response;
  }

  if (body.event.type == "app_mention") {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env["SLACK_BOT_USER_ACCESS_TOKEN"],
    };

    const data = {
      channel: body.event.channel,
      blocks: blocks,
    };

    await postRequest(
      process.env["SLACK_POST_MESSAGE_URL"],
      headers,
      JSON.stringify(data)
    );
  }
};

const handleAction = (payload) => {
  // WebHook を kick するだけなので、設定不要
  const headers = {};
  const data = "";

  const user = payload.user.username;
  switch (payload.actions[0].action_id) {
    case "main":
      postRequest(process.env["MAIN_WEBHOOK_URL"], headers, data);
      return `<@${user}> が本番環境をデプロイしました。`;
    case "staging":
      postRequest(process.env["STAGING_WEBHOOK_URL"], headers, data);
      return `<@${user}> がステージング環境をデプロイしました。`;
    case "cancel":
      return "キャンセルしました。";
    default:
      return "よう分からんわ。";
  }
};
