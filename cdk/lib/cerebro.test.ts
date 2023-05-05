import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Cerebro } from "./cerebro";
import { InstanceSize } from "aws-cdk-lib/aws-ec2";

describe("The Cerebro stack", () => {
  it("matches the snapshot", () => {
    const app = new App();
    const stack = new Cerebro(app, "Cerebro", { 
      stack: "media-service", 
      stage: "TEST", 
      instanceSize: InstanceSize.SMALL,
      domainName: "grid-cerebro-test.test.dev-gutools.co.uk",
      cerebroVersion: "v0.0.0",
    });
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
  });
});
