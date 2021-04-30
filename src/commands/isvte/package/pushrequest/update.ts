import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { cli } from 'cli-ux';
import { Connection } from 'jsforce';
import { PackagePushRequest } from '../../../../ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('isvte-packagepushplugin', 'pushplugin');

export default class Update extends SfdxCommand {

  public static description = messages.getMessage('isvte_package_pushrequest_update__Description');
  protected static flagsConfig = {
    id: flags.id({exclusive: ['where'], description: messages.getMessage('isvte_package_pushrequest_update__packagepushrequestsFlagDescription')}),
    where: flags.string({exclusive: ['packagepushrequestid'], description: messages.getMessage('isvte_package_pushrequest_update__whereFlagDescription')}),
    status: flags.enum({options: ['Canceled', 'Pending'], required: true, description: messages.getMessage('isvte_package_pushrequest_update__statusFlagDescription')}),
    preview: flags.boolean({description: messages.getMessage('isvte_package_pushrequest_update__previewFlagDescription')})
  };

  protected static requiresUsername = true;
  protected static requiresDevhubUsername = true;

  protected static createPartialPackagePushRequests(packagepushrequestIds: string[], status: string): Array<Partial<PackagePushRequest>> {
    const output = [];
    packagepushrequestIds.forEach(id => {
      output.push({Id: id, Status: status});
    });

    return output;
  }

  protected static async getPackagePushRequestIds(conn: Connection, id: string, where: string): Promise<string[]> {
    const output: string[] = [];

    if (id && !where) {
      // Use the single id provided
      output.push(id);
    } else if (!id && where) {
      // Execute a query to retreive the list of PackagePushRequestIds
      cli.action.start('Executing query for requested PackagePushRequests.');

      const results = await conn.sobject<PackagePushRequest>('PackagePushRequest')
      .select('Id')
      .where(where);

      cli.action.stop(`Returned ${results.length} records.`);

      if (results.length <= 0) {
        throw new SfdxError('No packagePushRequestIds meet specified criteria.');
      }

      results.forEach(i => {
        output.push(i.Id);
      });
    } else {
      throw new SfdxError('Invalid flags passed!');
    }

    return output;
  }

  public async run(): Promise<AnyJson> {
    // this org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const conn = this.org.getConnection();

    let pprs: Array<Partial<PackagePushRequest>>;
    try {
      const packagePushRequestIds: string[] = await Update.getPackagePushRequestIds(conn, this.flags.id, this.flags.where);
      pprs = Update.createPartialPackagePushRequests(packagePushRequestIds, this.flags.status);
    } catch (err) {
      this.ux.error('Error parsing parameters that determine the PackagePushRequest records to update, --id or --where.  Please review help for more information.');
      throw new SfdxError(err.message);
    }

    if (this.flags.preview) {
      this.ux.styledJSON(pprs);
      return pprs;
    } else {
      try {
        const results = await conn.sobject('PackagePushRequest').update(pprs, {allOrNone: true}, null);
        this.ux.styledJSON(results);
        return results.toString();
      } catch (err) {
        this.ux.error('PackagePushRequest Status Update Failed');
        throw new SfdxError(err.message);
      }
    }
  }
}
