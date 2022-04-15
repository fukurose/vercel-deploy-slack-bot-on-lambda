export const blocks = [
  {
    type: "header",
    text: {
      type: "plain_text",
      text: "どの環境をデプロイしますか",
      emoji: true,
    },
  },
  {
    type: "divider",
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*本番環境*",
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "デプロイ",
        emoji: true,
      },
      style: "primary",
      value: "main",
      action_id: "main",
    },
  },
  {
    type: "divider",
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*ステージング環境*",
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "デプロイ",
        emoji: true,
      },
      style: "primary",
      value: "staging",
      action_id: "staging",
    },
  },
  {
    type: "divider",
  },
  {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "キャンセル",
          emoji: true,
        },
        style: "danger",
        value: "cancel",
        action_id: "cancel",
      },
    ],
  },
];
