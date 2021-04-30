import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { deserializeJson } from '../../../helpers';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('isvte-packagepushplugin', 'pushplugin');

export default class Split extends SfdxCommand {

  public static description = messages.getMessage('isvte_util_split_Description');

  protected static flagsConfig = {
    input: flags.filepath({required: true, description: messages.getMessage('isvte_util_split_inputFlagDescription')}),
    property: flags.string({required: true,  description: messages.getMessage('isvte_util_split_propertyFlagDescription')}),
    outputdirectory: flags.directory({required: true, description: messages.getMessage('isvte_util_split_outputdirectoryFlagDescription')})
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;

  public async run(): Promise<AnyJson> {
    // Load the input file, deserialise from JSON
    const input: [] = deserializeJson(this.flags.input);

    // Sort by the property value
    const sortedInput = input.sort((a, b) => {
      a = a[this.flags.property];
      b = b[this.flags.property];

      if (a < b) return -1;
      else if (a > b) return 1;
      else if (a === b) return 0;
    });

    // Determine how many output files there will be (distinct values identified by the property argument)
    const outputKeys: string[] = [];

    sortedInput.forEach(i => {
      const propertyValue = i[this.flags.property];
      if (!outputKeys.includes(propertyValue)) {
        outputKeys.push(propertyValue);
      }
    });

    // Map input rows to output files

    return outputKeys as AnyJson;
  }
}
