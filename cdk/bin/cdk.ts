import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { Cerebro } from "../lib/cerebro";

const app = new App();
new Cerebro(app, "Cerebro-PROD", { stack: "media-service", stage: "PROD" });
new Cerebro(app, "Cerebro-TEST", { stack: "media-service", stage: "TEST" });
