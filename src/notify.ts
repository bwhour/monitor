import axios from "axios";
const routerServer = "https://hooks.slack.com/services/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";
const router = "https://hooks.slack.com/services/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";
const notify = async (
  chainId: number,
  token: string,
  data: string
): Promise<any> => {

  let param = " chainid : "+ chainId + "  address :" + token + " , balance : " + data ;

  let output;
  try {
    const res = await axios.post(`${router}`, {
      "text" : param
    });
    output = res.data;
  } catch (error) {
    console.error(error);
    output = error;
  }
  return output;
};

export {notify};