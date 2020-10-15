import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { SuccessResult } from 'jsforce';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('isvte-packagepushplugin', 'pushplugin');

export default class Update extends SfdxCommand {

  public static description = messages.getMessage('updateDescription');
  protected static flagsConfig = {
    packagepushrequests: flags.array({char: 'r', delimiter: ',', required: false, description: messages.getMessage('packagepushrequestsFlagDescription')}),
    allcreated: flags.boolean({char: 'c', required: false, exclusive: ['packagepushrequests'], description: messages.getMessage('allcreatedFlagDescription')}),
    allpending: flags.boolean({char: 'p', required: false, exclusive: ['packagepushrequests'], description: messages.getMessage('allpendingFlagDescription')}),
    status: flags.enum({char: 's', options: ['Canceled', 'Pending'], required: true, description: messages.getMessage('statusFlagDescription')})
  };

  protected static requiresUsername = true;
  protected static requiresDevhubUsername = true;

  protected static createRequestBody(packagepushrequestIds: string[], status: string): object {
    const output = [];
    packagepushrequestIds.forEach(id => {
      output.push({Id: id, Status: status});
    });

    return output;
  }

  public async run(): Promise<AnyJson> {
    // Validate incompatible parameters
    if (this.flags.allpending && this.flags.status === 'Pending') {
      throw new SfdxError('Invalid flags, cannot use --allpending with --status Pending.');  // TODO: Replace with message
    }

    // this org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const conn = this.org.getConnection();

    let packagePushRequestIds: string[] = [];
    if (this.flags.allcreated || this.flags.allpending) {
      // Fetch all created/pending packagePushRequests
      // TODO: Query all 'Created' or 'Pending' PackagePushRequests, depeding on flags
    } else {
      packagePushRequestIds = this.flags.packagepushrequests as string[];
    }

    if (packagePushRequestIds.length <= 0) {
      this.ux.log('No packagePushRequestIds meet specified criteria.'); // TODO: Update to use message
      return;
    }

    const status: string = this.flags.status;

    const requestBody = Update.createRequestBody(packagePushRequestIds, status);
    this.ux.styledJSON(requestBody);

    try {
      const response: SuccessResult = await conn.update('PackagePushRequest', requestBody) as SuccessResult;
      this.ux.styledJSON(response);
    } catch (err) {
      this.ux.log('PackagePushRequest Status Update Failed');
      throw new SfdxError(err.message);
    }

    return;
  }
}
