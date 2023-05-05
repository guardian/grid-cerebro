import {GuEc2App} from "@guardian/cdk";
import {AccessScope} from "@guardian/cdk/lib/constants";
import type {GuStackProps} from "@guardian/cdk/lib/constructs/core";
import {GuStack} from "@guardian/cdk/lib/constructs/core";
import {GuStringParameter} from '@guardian/cdk/lib/constructs/core/parameters';
import {GuCname} from "@guardian/cdk/lib/constructs/dns";
import type {GuAsgCapacity} from "@guardian/cdk/lib/types";
import type {App} from "aws-cdk-lib";
import {Duration} from 'aws-cdk-lib';
import type { InstanceSize} from "aws-cdk-lib/aws-ec2";
import {InstanceClass, InstanceType} from "aws-cdk-lib/aws-ec2";

interface CerebroStackProps extends GuStackProps {
  instanceSize: InstanceSize;
  domainName: string;
  cerebroVersion: string;
}
export class Cerebro extends GuStack {
  constructor(scope: App, id: string, props: CerebroStackProps) {
    super(scope, id, props);

    const esUrl = new GuStringParameter(this, 'elasticsearchUrl', {
      fromSSM: true,
      default: `/${props.stage}/${props.stack}/elasticsearch/url`,
    });

    const cerebroApp = new GuEc2App(this, {
      scaling:  {
        minimumInstances: 1,
      },
      applicationPort: 9000,
      app: "cerebro",
      access: {
        scope: AccessScope.PUBLIC,
      },
      instanceType: InstanceType.of(InstanceClass.T4G, props.instanceSize),
      certificateProps:{
        domainName: props.domainName
      },
      monitoringConfiguration: {
        noMonitoring: true
      },
      userData: `#!/bin/bash -ev
      adduser --disabled-password cerebro
      export HOME=/home/cerebro
      cd $HOME
      wget https://github.com/lmenezes/cerebro/releases/download/v${props.cerebroVersion}/cerebro_${props.cerebroVersion}_all.deb
      echo 'JAVA_OPTS="-Dconfig.file=/etc/cerebro/custom.conf -Dpidfile.path=/dev/null"' > /etc/default/cerebro
      mkdir /etc/cerebro
      cat <<EOF > /etc/cerebro/custom.conf
      echo '# Include these as defaults
      include "/etc/cerebro/application.conf"
      
      # Overrides
      data.path: "/var/lib/cerebro/cerebro.db"
      
      hosts = [
        {
          host = "${props.esUrl}"
          name = "Grid"
        }
      ]
      EOF
      dpkg -i cerebro_${props.cerebroVersion}_all.deb
`,
      roleConfiguration: {
        additionalPolicies: [
        ],
      },
    });

    const { domainName } = props;

    new GuCname(this, "CerebroCname", {
      app: "cerebro",
      resourceRecord: cerebroApp.loadBalancer.loadBalancerDnsName,
      ttl: Duration.hours(1),
      domainName: domainName,
    })
  }
}