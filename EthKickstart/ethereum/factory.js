import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x218d9e434AE5B42a98390ede8da3a24460e94766"
);

export default instance;
