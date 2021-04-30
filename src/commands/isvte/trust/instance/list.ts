import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson, JsonMap } from '@salesforce/ts-types';
// import { cli } from 'cli-ux';
import { HTTP } from 'http-call';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('isvte-packagepushplugin', 'pushplugin');

export default class List extends SfdxCommand {

  public static description = messages.getMessage('isvte_trust_instance_list__Description');

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;

  protected static flagsConfig = {
    sort: flags.string({default: 'location', description: messages.getMessage('isvte_trust_instance_list__sortFlagDescription')}),
    childproducts: flags.boolean({default: false, description: messages.getMessage('isvte_trust_instance_list__childproductsFlagDescription')})
  };

  public async run(): Promise<AnyJson> {
    try {
      const url: string = `https://api.status.salesforce.com/v1/instances?sort=${this.flags.sort}&childProducts=${this.flags.childproducts}`;
      const response = await (await HTTP.get<Instance[]>(url)).body;

      const fields = ['key', 'location', 'environment'];
      const instances: Array<Partial<Instance>> = response.map((value, index, array) => {
        const output: Partial<Instance> = {};
        fields.forEach(f => {
          output[f] = value[f];
        });
        return output;
      });

      instances.sort();

      // Get distinct locations
      /* const locations: string[] = [];
      instances.forEach( i => {
        if (!locations.includes(i.location)) locations.push(i.location);
      });

      var output = groupBy(instances, 'location');*/

      return instances;

    } catch (err) {
      this.ux.log('Failed to list subscribers.');
      throw new SfdxError(err.message);
    }
  }
}
/*
Array.prototype.complexSort = function(field: string) {

}

function groupBy<T>(input: T[], key:string) {
  return input.reduce(function(rv, x: T) {
    const a: T[] = (rv[x[key]] = rv[x[key]] || [])
    a.push(x);
    return rv;
  }, {})
}
*/

interface Instance extends JsonMap {
  key: string;
  location: string;
  environment: string;
  releaseVersion: string;
  releaseNumber: string;
  isActive: true;
  maintenanceWindow: string;
  serviceKeys: string[];
}
