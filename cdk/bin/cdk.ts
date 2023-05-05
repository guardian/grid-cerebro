import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { InstanceSize } from "aws-cdk-lib/aws-ec2";
import { Cerebro } from "../lib/cerebro";

const app = new App();

new Cerebro(app, { 
    stack: "grid-elasticsearch", 
    stage: "TEST", 
    instanceSize: InstanceSize.SMALL,
    domainName: "cerebro-new.media.test.dev-gutools.co.uk",
    cerebroVersion: "0.9.4",
});

new Cerebro(app, { 
    stack: "grid-elasticsearch", 
    stage: "PROD", 
    instanceSize: InstanceSize.SMALL,
    domainName: "cerebro-new.media.gutools.co.uk",
    cerebroVersion: "0.9.4",
});