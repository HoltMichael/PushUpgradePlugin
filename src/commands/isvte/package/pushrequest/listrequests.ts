import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, fs, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { QueryPackagePushRequest } from '../../../../shared';


// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('isvte-packagepushplugin', 'pushplugin');

export default class PackagePushRequestList extends SfdxCommand {

  public static description = messages.getMessage('packagePushRequestListDescription');

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    packageversion: flags.string({char: 'v', description: messages.getMessage('packageversionFlagDescription')}),
    status: flags.array({char: 's', delimiter: ',', options: ['Canceled', 'Created', 'Failed', 'InProgress', 'Pending', 'Succeeded'], description: messages.getMessage('statusFlagDescription')}),
    createfile: flags.boolean({char: 'f', description: messages.getMessage('fileFlagDescription')}),
    directoryforsave: flags.string({char: 'd', description: messages.getMessage('directoryFlagDescription')}) //Save the output directory to a file so that we can use it when we go to do the push
  };

  protected static requiresUsername = true;
  protected static supportsDevhubUsername = true;

  public async run(): Promise<AnyJson> {
      // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const conn = this.org.getConnection();
    let query = 'SELECT id, packageVersionId, scheduledStartTime, status FROM PackagePushRequest';
    if (this.flags.packageversion || this.flags.status) {
      const whereClauses: string[] = [];

      if (this.flags.packageversion) {
        whereClauses.push(' PackageVersionId = \'' + this.flags.packageversion + '\'');
      }
      if (this.flags.status) {
        whereClauses.push(' Status IN (\'' + this.flags.status.join('\',') + '\')');
      }

      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    // Query the org
    try {
      // this.ux.log('Executing query: ' + query);
      const results = await QueryPackagePushRequest(conn, this.flags.packageversion, this.flags.scheduledStartTime, this.flags.status);

      // If the user wants to output the response to a file (Useful for update command)
      if(this.flags.createfile){
        // Don't output to a file if the user hasn't specified an output directory
        if(this.flags.directoryforsave){
          var subs = {
            subscribers: []
          };
          results.records.forEach(element => {
            subs.subscribers.push({
              "Id" : element.Id,
              "PackageVersionId" : element.PackageVersionId,
              "ScheduledStartTime" : element.ScheduledStartTime,
              "Status" : element.Status
            })
          });
          fs.writeFile("Package Push Requests.json", JSON.stringify(subs));
        }else{
          this.ux.log('Unable to save to file, no directory specified with -d flag');
        }
      }

      //Output results to table on-screen
      this.ux.table(results.records,
        {columns: [
          {key: 'Id', label: 'ID'},
          {key: 'PackageVersionId', label: 'Package Version ID'},
          {key: 'ScheduledStartTime', label: 'Scheduled start time'},
          {key: 'Status', label: 'Status'}
        ]}
      );

      return results.records;
    } catch (err) {
      this.ux.log('Failed to list subscribers, using query: ' + query);
      throw new SfdxError(err.message);
    }

    // Return an object to be displayed with --json
    return;
  }
}
