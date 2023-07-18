import "source-map-support/register";
import {GuRootExperimental} from "@guardian/cdk/lib/experimental/constructs";
import { InstanceSize } from "aws-cdk-lib/aws-ec2";
import { Cerebro } from "../lib/cerebro";

const app = new GuRootExperimental();

const stack = "media-service";

const env = {
    region: "eu-west-1"
};
new Cerebro(app, {
    env,
    stack,
    stage: "TEST",
    instanceSize: InstanceSize.SMALL,
    domainName: "cerebro.media.test.dev-gutools.co.uk",
    cerebroVersion: "0.9.4",
});

new Cerebro(app, {
    env,
    stack,
    stage: "PROD",
    instanceSize: InstanceSize.SMALL,
    domainName: "cerebro.media.gutools.co.uk",
    cerebroVersion: "0.9.4",
});
