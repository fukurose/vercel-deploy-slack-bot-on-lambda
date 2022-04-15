import https from "https";

export const postRequest = async (url, headers, message) => {
  const options = { method: "POST", headers: headers };

  return new Promise((resolve, reject) => {
    let req = https
      .request(url, options, (res) => {
        res.on("end", () => {
          console.log("completed postRequest");
          resolve(res.statusCode);
        });
      })
      .on("error", (e) => {
        console.log("error postRequest:" + e.message);
        reject(e);
      });
    req.write(message);
    req.end();
  });
};
