import build from "pino-abstract-transport";
import ky from "ky";

export default function GraphjsonTransport({
  apiKey,
  collection,
  graphjsonUrl = "https://api.graphjson.com/api/log",
}: {
  apiKey: string;
  collection: string;
  graphjsonUrl?: string;
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
          await ky(graphjsonUrl, {
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
