import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { deserializeJson } from '../../../helpers';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('isvte-packagepushplugin', 'pushplugin');

export default class Subtract extends SfdxCommand {

  public static description = messages.getMessage('isvte_util_subtract_Description');

  protected static flagsConfig = {
    inputa: flags.filepath({char: 'a', required: true, description: messages.getMessage('isvte_util_subtract_inputaFlagDescription')}),
    inputb: flags.filepath({char: 'b', required: true,  description: messages.getMessage('isvte_util_subtract_inputbFlagDescription')}),
    key: flags.string({char: 'k', required: true,  description: messages.getMessage('isvte_util_subtract_keyFlagDescription')})
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;

  public async run(): Promise<AnyJson> {
    const a: [] = deserializeJson(this.flags.inputa);
    const b: [] = deserializeJson(this.flags.inputb);

    const output = [];
    for (const record of a) {
      if (!b.find(element => element[this.flags.key] === record[this.flags.key])) {
        output.push(record);
      }
    }

    return output;
  }
}
