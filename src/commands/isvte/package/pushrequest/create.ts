import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, fs, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { RequestInfo } from 'jsforce';
import { join } from 'path';
import { CompositeTreeResponse } from '../../../../shared';




//import Subscribers from '../subscribers';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('isvte-packagepushplugin', 'pushplugin');

export default class Create extends SfdxCommand {

  public static description = messages.getMessage('createDescription');

  protected static flagsConfig = {
    packageversion: flags.string({char: 'p', required: true, description: messages.getMessage('packageVersionFlagDescription')}),
    scheduledstarttime: flags.datetime({char: 't', required: false, description: messages.getMessage('scheduledStartTimeFlagDescription')}),
    organisationid: flags.array({char: 'o', delimiter: ',', required: false, description: messages.getMessage('organisationidFlagDescription')}),
    subscriberorgidfile: flags.filepath({char: 's', description: messages.getMessage('subscriberorgidsFlagDescription'),required: false}),
  };

  protected static requiresUsername = true;
  protected static requiresDevhubUsername = true;

  protected static createRequestBody(packageVersionId: string, scheduledStartTime: Date, subscribers: string[]) {
    let referenceCounter = 0;

    if(!scheduledStartTime){
      scheduledStartTime = new Date();
    }

    const output = {
      records: [{
        attributes: {type: 'PackagePushRequest', referenceId: 'ref' + referenceCounter.toString()},
        PackageVersionId: packageVersionId,
        ScheduledStartTime: scheduledStartTime.toISOString(),
        PackagePushJobs: {
          records: []
        }
      }]
    };

    subscribers.forEach(s => {
      referenceCounter++; // increment referenceId counter

      const ppj = {
        attributes: {type: 'PackagePushJob', referenceId: 'ref' + referenceCounter.toString()},
        // PackagePushRequestId: output.records[0].attributes.referenceId,
        SubscriberOrganizationKey: s
      };

      output.records[0].PackagePushJobs.records.push(ppj);
    });

    return output;
  }

  async readJsonFile(): Promise<AnyJson>{
    try{
      return fs.readJson(this.flags.subscriberOrgIds);
    }catch(err){
      let outputmsg: AnyJson = err.message;
      return outputmsg;
    }
  }

  public async run(): Promise<AnyJson> {
    const packageVersionId: string = this.flags.packageversion;
    const scheduledStartTime: Date = this.flags.scheduledstarttime;

    //TO DO
    //Create an Update command to change the status of the PushRequests
    //Create a cancellation?
    //Could use something like this to find a file in the tree called Subscribers: const file = await fs.traverseForFile(__dirname, 'Subscribers.json');
    //Should also permit users to pass a directory for the file and a single org parameter -o

    const directory = this.flags.subscriberorgidfile;'';// __dirname;
    const subscriberFile=await fs.readFile(join(directory), 'utf-8');
    const subscriberObj = JSON.parse(subscriberFile);
    //let subscribers = myObj.subscribers.orgId;
    let subscribers: string[] = [];
    subscriberObj.subscribers.forEach(sub => {
      subscribers.push(sub.orgId);
    });

    const requestBody = Create.createRequestBody(packageVersionId, scheduledStartTime, subscribers);
    // this.ux.styledJSON(requestBody);

    // this org is guaranteed because requiresUsername=true, as opposed to supportsUsername
    const conn = this.org.getConnection();

    try {
      const r: RequestInfo = {url: '/services/data/v49.0/composite/tree/PackagePushRequest/', body: JSON.stringify(requestBody), method: 'POST'};
      const response: CompositeTreeResponse = await conn.request(r) as CompositeTreeResponse;
      // const compositeResponse: CompositeTreeResponse = asObject(response);
      // const compositeResponse: CompositeTreeResponse = response;

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
