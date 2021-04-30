import { flags, SfdxCommand } from '@salesforce/command';
import { Connection, Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { cli } from 'cli-ux';
import { removeUnwantedAttributes } from '../../../../helpers';
import { PackagePushJob, PackagePushRequest } from '../../../../ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('isvte-packagepushplugin', 'pushplugin');

export default class List extends SfdxCommand {

  public static description = messages.getMessage('isvte_package_pushrequest_list__Description');

  protected static requiresUsername = true;
  protected static supportsDevhubUsername = true;

  protected static packagePushJobFieldNames = ['Id', 'DurationSeconds', 'EndTime', 'PackagePushRequestId', 'StartTime', 'Status', 'SubscriberOrganizationKey'];

  protected static flagsConfig = {
    fields: flags.array({char: 'f', delimiter: ',', default: ['Id', 'DurationSeconds', 'EndTime', 'PackageVersionId', 'ScheduledStartTime', 'StartTime', 'Status'], description: messages.getMessage('isvte_package_pushrequest_list__fieldsFlagDescription')}),
    where: flags.string({char: 'w', default: 'Status != \'Canceled\'', description: messages.getMessage('isvte_package_pushrequest_list__whereFlagDescription')}),
    orderby: flags.string({char: 'o', default: 'ScheduledStartTime, PackageVersionId', description: messages.getMessage('isvte_package_pushrequest_list__orderbyFlagDescription')}),
    limit: flags.integer({char: 'l', description: messages.getMessage('isvte_package_pushrequest_list__limitFlagDescription')}),
    includejobs: flags.boolean({description: messages.getMessage('isvte_package_pushrequest_list__includejobsFlagDescription')})
  };

  public async run(): Promise<AnyJson> {
    // this.org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const conn = this.org.getConnection();

    try {
      // Query for the PackagePushRequests
      cli.action.start('Executing query for requested PackagePushRequests.');
      const output = await this.queryPackagePushRequest(conn);
      cli.action.stop(`Returned ${output.length} records.`);

      let jobs: Array<Partial<PackagePushJob>> = [];
      if (this.flags.includejobs) {
        const requestIds: string[] = output.map(request => request.Id);

        // Query for the PackagePushJobs
        cli.action.start('Executing query for requested PackagePushJobs.');
        jobs = await this.queryPackagePushJob(conn, requestIds);
        cli.action.stop(`Returned ${jobs.length} records.`);

        for (const request of output) {
            const filteredJobs = jobs.filter(job => {
                return (job.PackagePushRequestId === request.Id);
            });
            request.PackagePushJobs = filteredJobs;
        }
      }

      // Display the output to UX
      if (!this.flags.includejobs) {
          this.uxPackagePushRequestTable(output);
      } else {
          for (const request of output) {
              this.uxPackagePushRequestTable([request]);
              this.uxPackagePushJobTable(request.PackagePushJobs);
              this.ux.log('\n');
          }
      }

      // Return object for --json output
      return output;

    } catch (err) {
      this.ux.log('Failed to list subscribers.');
      throw new SfdxError(err.message);
    }
  }

  protected async queryPackagePushRequest(conn: Connection): Promise<Array<Partial<PackagePushRequest>>> {
    // Perform the query against the Org
    const output = await conn.sobject<PackagePushRequest>('PackagePushRequest')
      .select(this.flags.fields)
      .where(this.flags.where)
      .sort(this.flags.orderby)
      .limit(this.flags.limit);

    // Remove unwanted properties from the returned objects
    removeUnwantedAttributes(output);

    return output;
  }

  protected async queryPackagePushJob(conn: Connection, packagePushRequestIds: string[]): Promise<Array<Partial<PackagePushJob>>> {
    // Prepare the where condition(s)
    const whereConditions = {
      PackagePushRequestId: {
          $in: packagePushRequestIds
      }
    };

    // Prepare the order by expression
    const orderByExpressions = {PackagePushRequestId: 1, SubscriberOrganizationKey: 1};

    // Perform the query against the Org
    const output = await conn.sobject<PackagePushJob>('PackagePushJob')
      .select(List.packagePushJobFieldNames)
      .where(whereConditions)
      .sort(orderByExpressions);

    // Remove unwanted properties from the returned objects
    removeUnwantedAttributes(output);

    return output;
  }

  protected uxPackagePushRequestTable(requests: Array<Partial<PackagePushRequest>>) {
    this.ux.table(requests, this.flags.fields);
  }

  protected uxPackagePushJobTable(requests: Array<Partial<PackagePushJob>>) {
    this.ux.table(requests, List.packagePushJobFieldNames);
  }
}
