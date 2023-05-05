import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { InstanceSize } from "aws-cdk-lib/aws-ec2";
import { Cerebro } from "../lib/cerebro";

const app = new App();

new Cerebro(app, "Cerebro-TEST", { 
    stack: "media-service", 
    stage: "TEST", 
    instanceSize: InstanceSize.SMALL,
    domainName: "cerebro.media.test.dev-gutools.co.uk",
    cerebroVersion: "v0.0.0",
});

new Cerebro(app, "Cerebro-PROD", { 
    stack: "media-service", 
    stage: "PROD", 
    instanceSize: InstanceSize.SMALL,
    domainName: "cerebro.media.gutools.co.uk",
    cerebroVersion: "v0.0.0",
});