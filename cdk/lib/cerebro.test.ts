import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Cerebro } from "./cerebro";

describe("The Cerebro stack", () => {
  it("matches the snapshot", () => {
    const app = new App();
    const stack = new Cerebro(app, "Cerebro", { stack: "media-service", stage: "TEST" });
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
  });
});
