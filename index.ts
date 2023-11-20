import build from "pino-abstract-transport";

export default function GraphjsonTransport(options?: { destination?: string }) {
  const destinationFile = options?.destination || process.stdout.fd; // path.join(tmpdir(), "rtmp.logs");
  console.log("->", destinationFile);
  return build(
    function (source) {
      source.on("data", (d) => {
        console.log("lOOOG", d);
      });
    },
    {
      async close(err) {
        console.log("cloose", err);
      },
    }
  );
}
