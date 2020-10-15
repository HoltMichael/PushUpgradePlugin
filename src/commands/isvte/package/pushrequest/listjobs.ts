import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson, JsonMap } from '@salesforce/ts-types';
import { QueryResult } from 'jsforce';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('isvte-packagepushplugin', 'pushplugin');

export default class PackagePushRequestList extends SfdxCommand {

  public static description = messages.getMessage('packagePushRequestListDescription');

  protected static requiresUsername = true;
  protected static supportsDevhubUsername = true;
  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    pushrequest: flags.string({char: 'r', description: messages.getMessage('packageversionFlagDescription')}), // Add a message for request
    status: flags.array({char: 's', delimiter: ',', description: messages.getMessage('statusFlagDescription')})
  };

  public async run(): Promise<AnyJson> {
    const conn = this.org.getConnection();
    let query = 'SELECT Id, PackagePushRequestId, Status, SubscriberOrganizationKey FROM PackagePushJob';
    if (this.flags.packageversion || this.flags.status) {
      const whereClauses: string[] = [];

      if (this.flags.packageversion) {
        whereClauses.push(' PackagePushRequestId = \'' + this.flags.pushrequest + '\'');
      }
      if (this.flags.status) {
        whereClauses.push(' Status IN (\'' + this.flags.status.join('\',') + '\')');
      }

      query += ' WHERE ' + whereClauses.join(' AND ');
      query += ' GROUP By PackagePushRequestId';
    }

    // The type we are querying for
    interface PackagePushJob extends JsonMap {
      Id?: string;
      PackagePushRequestId?: string;
      Status: string;
      SubscriberOrganizationKey?: string;
    }

    // Query the org
    try {
      // this.ux.log('Executing query: ' + query);
      const results: QueryResult<PackagePushJob> = await conn.query<PackagePushJob>(query);

      this.ux.table(results.records,
        {columns: [
          {key: 'Id', label: 'ID'},
          {key: 'PackagePushRequestId', label: 'Push Request ID'},
          {key: 'Status', label: 'Status'},
          {key: 'SubscriberOrganizationKey', label: 'Subscriber Org'}
        ]}
      );

      return results.records;
    } catch (err) {
      // this.ux.log('Failed to list subscribers, using query: ' + query);
      throw new SfdxError(err.message);
    }
  }
}
