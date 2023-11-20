import build from "pino-abstract-transport";
import fetch from "node-fetch";

export default function GraphjsonTransport({
  apiKey,
  collection,
}: {
  apiKey: string;
  collection: string;
}) {
  console.log({ apiKey, collection });
  return build(
    async function (source) {
      for await (const obj of source) {
        const payload = {
          api_key: apiKey,
          collection,
          json: JSON.stringify(obj),
          timestamp: Math.floor(new Date().getTime() / 1000),
        };

        try {
          await fetch("https://api.graphjson.com/api/log", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    {
      async close(err) {
        console.log("cloose", err);
      },
    }
  );
}
