import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { RequestInfo } from 'jsforce';
import { deserializeJson } from '../../../../helpers';
import { CompositeTreeRequest, CompositeTreeRequestRecord, CompositeTreeResponse } from '../../../../ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('isvte-packagepushplugin', 'pushplugin');

export default class Create extends SfdxCommand {

  public static description = messages.getMessage('isvte_package_pushrequest_create__Description');

  protected static flagsConfig = {
    packageversionid: flags.id({required: true, description: messages.getMessage('isvte_package_pushrequest_create__packageVersionFlagDescription')}),
    scheduledstarttime: flags.datetime({description: messages.getMessage('isvte_package_pushrequest_create__scheduledStartTimeFlagDescription')}),
    subscriberids: flags.array({exclusive: ['subscribersfile'], delimiter: ',', description: messages.getMessage('isvte_package_pushrequest_create__subscriberidsFlagDescription')}),
    subscribersfile: flags.filepath({exclusive: ['subscriberids'], description: messages.getMessage('isvte_package_pushrequest_create__subscribersfileFlagDescription')}),
    preview: flags.boolean({description: messages.getMessage('isvte_package_pushrequest_create__subscribersfileFlagDescription')})
  };

  protected static requiresUsername = true;
  protected static requiresDevhubUsername = true;

  protected static createCompositeTreeRequest(packageVersionId: string, scheduledStartTime: Date, subscribers: string[]): CompositeTreeRequest {
    // Create the children, in this case the PackagePushJobs
    const children: CompositeTreeRequest = {
      records: []
    };

    let referenceCounter = 1;
    subscribers.forEach(s => {
      const ppj: CompositeTreeRequestRecord = {
        attributes: {type: 'PackagePushJob', referenceId: `ref${referenceCounter}`},
        SubscriberOrganizationKey: s
      };

      children.records.push(ppj);
      referenceCounter++; // increment referenceId counter
    });

    // Create the parent, in this case a single PackagePushRequest
    const parent: CompositeTreeRequestRecord = {
      attributes: {type: 'PackagePushRequest', referenceId: 'ref0'},
      PackageVersionId: packageVersionId,
      ScheduledStartTime: (scheduledStartTime) ? scheduledStartTime.toISOString() : null,
      PackagePushJobs: children
    };

    // Create the CompositeTreeRequest, as the root container for the parent
    const output: CompositeTreeRequest = {
      records: [parent]
    };

    return output;
  }

  public async run(): Promise<AnyJson> {
    const JSON_FILE_SUBSCRIBER_ORG_ID_ATTRIBUTE_NAME = 'OrgKey';

    const packageVersionId: string = this.flags.packageversionid;
    const scheduledStartTime: Date = this.flags.scheduledstarttime;

    const subscribers: string[] = [];
    if (this.flags.subscribersfile) {
      const records = deserializeJson(this.flags.subscribersfile);
      records.forEach(r => subscribers.push(r[JSON_FILE_SUBSCRIBER_ORG_ID_ATTRIBUTE_NAME]));
    }

    if (this.flags.subscriberids) {
      this.flags.subscriberids.forEach(i => subscribers.push(i));
    }

    const requestBody = Create.createCompositeTreeRequest(packageVersionId, scheduledStartTime, subscribers);

    if (this.flags.preview) {
      // Display the request
      this.ux.styledJSON(requestBody);
      return requestBody;
    } else {
      // this org is guaranteed because requiresUsername=true, as opposed to supportsUsername
      const conn = this.org.getConnection();

      try {
        const r: RequestInfo = {url: '/services/data/v49.0/composite/tree/PackagePushRequest/', body: JSON.stringify(requestBody), method: 'POST'};
        const response: CompositeTreeResponse = await conn.request(r) as CompositeTreeResponse;

        if (!response.hasErrors) {
          // find the result for ref0, this is the PackagePushRequest record
          const ppr = response.results.find(record => record.referenceId === 'ref0');
          this.ux.log('Created PackagePushRequest, Id = ' + ppr.id);

          return response;
        }
      } catch (err) {
        this.ux.log('PackagePushRequest Failed');
        throw new SfdxError(err.message);
      }
    }
  }
}
