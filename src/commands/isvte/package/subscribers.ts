import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { removeUnwantedAttributes } from '../../../helpers';
import { PackageSubscriber } from '../../../ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('isvte-packagepushplugin', 'pushplugin');

export default class Subscribers extends SfdxCommand {

  public static description = messages.getMessage('isvte_package_subscribers__Description');

  protected static flagsConfig = {
    fields: flags.array({char: 'f', delimiter: ',', default: ['Id', 'InstalledStatus', 'InstanceName', 'MetadataPackageId', 'MetadataPackageVersionId', 'OrgKey', 'OrgName', 'OrgStatus', 'OrgType', 'ParentOrg'], description: messages.getMessage('isvte_package_subscribers__fieldsFlagDescription')}),
    where: flags.string({char: 'w', default: 'InstalledStatus = \'i\'', description: messages.getMessage('isvte_package_subscribers__whereFlagDescription')}),
    orderby: flags.string({char: 'o', default: 'OrgType DESC, InstanceName, MetadataPackageId, MetadataPackageVersionId, OrgName', description: messages.getMessage('isvte_package_subscribers__orderbyFlagDescription')}),
    limit: flags.integer({char: 'l', description: messages.getMessage('isvte_package_subscribers__limitFlagDescription')})
  };

  protected static requiresUsername = true;
  protected static supportsDevhubUsername = true;

  public async run(): Promise<AnyJson> {
    // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const conn = this.org.getConnection();

    // Query the org
    try {
      const output = await conn.sobject<PackageSubscriber>('PackageSubscriber')
        .select(this.flags.fields)
        .where(this.flags.where)
        .sort(this.flags.orderby)
        .limit(this.flags.limit);

      // Remove unwanted attributes to avoid them being serialized in JSON
      removeUnwantedAttributes(output);

      // Display table of results
      this.ux.table(output, this.flags.fields);

      // Return object for --json output
      return output;

    } catch (err) {
      this.ux.log('Failed to list subscribers.');
      throw new SfdxError(err.message);
    }
  }
}
