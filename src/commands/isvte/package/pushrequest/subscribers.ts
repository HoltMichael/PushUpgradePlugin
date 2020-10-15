import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, fs, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';


// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('isvte-packagepushplugin', 'pushplugin');

export default class Subscribers extends SfdxCommand {

  public static description = messages.getMessage('subscribersDescription');

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    package: flags.string({char: 'p', description: messages.getMessage('packageFlagDescription')}),
    packageversion: flags.string({char: 'v', description: messages.getMessage('packageversionFlagDescription')}),
    orgtype: flags.array({options: ['Production', 'Sandbox'], description: messages.getMessage('orgtypeFlagDescription')}),
    orgstatus: flags.array({options: ['Active', 'Demo', 'Free', 'Inactive', 'Trial'], description: messages.getMessage('orgstatusFlagDescription')}),
    orderby: flags.array({char: 'o', default: ['OrgType DESC', 'InstanceName', 'MetadataPackageId', 'MetadataPackageVersionId', 'OrgName'], delimiter: ',', options: ['InstanceName', 'MetadataPackageId', 'MetadataPackageVersionId', 'OrgName', 'OrgStatus', 'OrgType'], description: messages.getMessage('orderbyFlagDescription')}),
    anyinstallstatus: flags.boolean({required: false, description: messages.getMessage('anyinstallstatusFlagDescription')}),
    directoryforsave: flags.string({char: 'd', description: messages.getMessage('directoryFlagDescription')}) //Save the output directory to a file so that we can use it when we go to do the push
  };

  protected static requiresUsername = true;
  protected static supportsDevhubUsername = true;

  public async run(): Promise<AnyJson> {
      // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const conn = this.org.getConnection();
    let query = 'SELECT InstalledStatus, InstanceName, MetadataPackageId, MetadataPackageVersionId, OrgKey, OrgName, OrgStatus, OrgType, ParentOrg FROM PackageSubscriber';
    if (this.flags.packageversion) {
      query += ' WHERE MetadataPackageVersionId = \'' + this.flags.packageversion + '\'';
    } else if (this.flags.package) {
      query += ' WHERE MetadataPackageId = \'' + this.flags.package + '\'';
    }

    if (!(this.flags.package || this.flags.packageversion)) {
      throw new SfdxError('You must specify either a package, or package version.');
    }

    // The type we are querying for
    interface PackageSubscriber {
      InstalledStatus: string;
      InstanceName: string;
      MetadataPackageId: string;
      MetadataPackageVersionId: string;
      OrgKey: string;
      OrgName: string;
      OrgStatus: string;
      OrgType: string;
      ParentOrg: string;
    }

    // Query the org
    try {
      const results = await conn.query<PackageSubscriber>(query);
      this.ux.table(results.records,
        {columns: [
          {key: 'Id', label: 'ID'},
          {key: 'InstalledStatus', label: 'Installed status'},
          {key: 'InstanceName', label: 'Instance name'},
          {key: 'MetadataPackageId', label: 'Package ID'},
          {key: 'MetadataPackageVersionId', label: 'Package version ID'},
          {key: 'OrgKey', label: 'Org ID'},
          {key: 'OrgName', label: 'Org name'},
          {key: 'OrgStatus', label: 'Org status'},
          {key: 'OrgType', label: 'Org type'},
          {key: 'ParentOrg', label: 'Parent org'}
        ]}
      );
      
      var subs = {
        subscribers: []
      };
      results.records.forEach(element => {
        subs.subscribers.push({
          "orgId" : element.OrgKey,
          "company" : element.OrgName
        })
      });
      fs.writeFile("Subscribers.json", JSON.stringify(subs)); //Need to save this to a specified directory
    } catch (err) {
      this.ux.log('Failed to list subscribers, using query: ' + query);
      throw new SfdxError(err.message);
    }

    // Return an object to be displayed with --json
    return;
  }
}
