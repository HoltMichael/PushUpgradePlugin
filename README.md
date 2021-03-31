isvte-packagepushplugin
=======================

Test Plugin before starting the Push Upgrades project

[![Version](https://img.shields.io/npm/v/isvte-packagepushplugin.svg)](https://npmjs.org/package/isvte-packagepushplugin)
[![CircleCI](https://circleci.com/gh/HoltMichael/PushPlugin/tree/master.svg?style=shield)](https://circleci.com/gh/HoltMichael/PushPlugin/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/HoltMichael/PushPlugin?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/PushPlugin/branch/master)
[![Codecov](https://codecov.io/gh/HoltMichael/PushPlugin/branch/master/graph/badge.svg)](https://codecov.io/gh/HoltMichael/PushPlugin)
[![Greenkeeper](https://badges.greenkeeper.io/HoltMichael/PushPlugin.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/HoltMichael/PushPlugin/badge.svg)](https://snyk.io/test/github/HoltMichael/PushPlugin)
[![Downloads/week](https://img.shields.io/npm/dw/isvte-packagepushplugin.svg)](https://npmjs.org/package/isvte-packagepushplugin)
[![License](https://img.shields.io/npm/l/isvte-packagepushplugin.svg)](https://github.com/HoltMichael/PushPlugin/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g isvte-packagepushplugin
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
isvte-packagepushplugin/0.0.0 darwin-x64 node-v14.16.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx isvte:package:pushrequest:create --packageversionid <id> [--scheduledstarttime <datetime>] [--subscriberids <array> | --subscribersfile <filepath>] [--preview] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-isvtepackagepushrequestcreate---packageversionid-id---scheduledstarttime-datetime---subscriberids-array----subscribersfile-filepath---preview--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx isvte:package:pushrequest:list [-f <array>] [-w <string>] [-o <string>] [-l <integer>] [--includejobs] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-isvtepackagepushrequestlist--f-array--w-string--o-string--l-integer---includejobs--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx isvte:package:pushrequest:update --status Canceled|Pending [--id <id> | --where <string>] [--preview] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-isvtepackagepushrequestupdate---status-canceledpending---id-id----where-string---preview--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx isvte:package:subscribers [-f <array>] [-w <string>] [-o <string>] [-l <integer>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-isvtepackagesubscribers--f-array--w-string--o-string--l-integer--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx isvte:trust:instance:list [--sort <string>] [--childproducts] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-isvtetrustinstancelist---sort-string---childproducts---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx isvte:util:split --input <filepath> --property <string> --outputdirectory <directory> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-isvteutilsplit---input-filepath---property-string---outputdirectory-directory---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx isvte:util:subtract -a <filepath> -b <filepath> -k <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-isvteutilsubtract--a-filepath--b-filepath--k-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx isvte:package:pushrequest:create --packageversionid <id> [--scheduledstarttime <datetime>] [--subscriberids <array> | --subscribersfile <filepath>] [--preview] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create PackagePushRequest and associated PackagePushJob records.

```
USAGE
  $ sfdx isvte:package:pushrequest:create --packageversionid <id> [--scheduledstarttime <datetime>] [--subscriberids 
  <array> | --subscribersfile <filepath>] [--preview] [-v <string>] [-u <string>] [--apiversion <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername
      username or alias for the dev hub org; overrides default dev hub org

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --packageversionid=packageversionid
      (required) PackageVersionID to upgrade the subscriber to.

  --preview
      Path to JSON file of subscriber org ids, to create associated PackagePushJobs for.  Expects array of objects such as 
      {OrgKey: 'XXXXXXXXXXXXX'}

  --scheduledstarttime=scheduledstarttime
      The date and time (UTC) at which the push request is processed, in ISO 8601 format. Set this value to the earliest 
      time that you want Salesforce to attempt to start the push. As a best practice, schedule pushes at off-peak hours 
      like 1:00 AM Saturday. If you don’t specify a value, the push starts when the package push request’s Status is set 
      to Pending.

  --subscriberids=subscriberids
      Comma separated list of subscriber org ids, to create associated PackagePushJobs for.

  --subscribersfile=subscribersfile
      Path to JSON file of subscriber org ids, to create associated PackagePushJobs for.  Expects array of objects such as 
      {OrgKey: 'XXXXXXXXXXXXX'}
```

_See code: [lib/commands/isvte/package/pushrequest/create.js](https://github.com/HoltMichael/PushPlugin/blob/v0.0.0/lib/commands/isvte/package/pushrequest/create.js)_

## `sfdx isvte:package:pushrequest:list [-f <array>] [-w <string>] [-o <string>] [-l <integer>] [--includejobs] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

List PackagePushRequest records.

```
USAGE
  $ sfdx isvte:package:pushrequest:list [-f <array>] [-w <string>] [-o <string>] [-l <integer>] [--includejobs] [-v 
  <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -f, --fields=fields
      [default: Id,DurationSeconds,EndTime,PackageVersionId,ScheduledStartTime,StartTime,Status] The fields from 
      PackagePushRequest you wish to return.

  -l, --limit=limit
      Specify the maximum number of rows to return.

  -o, --orderby=orderby
      [default: ScheduledStartTime, PackageVersionId] Order the results, supply a comma separated list of field names.  
      Can optionally include DESC modifier to sort in descending order.

  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername
      username or alias for the dev hub org; overrides default dev hub org

  -w, --where=where
      [default: Status != 'Canceled'] The SOQL where clause applied to limit the results.

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --includejobs
      Retrieve the child PackagePushJob records linked to the requested PackagePushRequests.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation
```

_See code: [lib/commands/isvte/package/pushrequest/list.js](https://github.com/HoltMichael/PushPlugin/blob/v0.0.0/lib/commands/isvte/package/pushrequest/list.js)_

## `sfdx isvte:package:pushrequest:update --status Canceled|Pending [--id <id> | --where <string>] [--preview] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Pushes a package upgrade to a specified org

```
USAGE
  $ sfdx isvte:package:pushrequest:update --status Canceled|Pending [--id <id> | --where <string>] [--preview] [-v 
  <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername
      username or alias for the dev hub org; overrides default dev hub org

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --id=id
      PackagePushRequestId to update.  Cannot be used in conjunction with --allcreated, or --allpending flags.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --preview
      Preview the update request (JSON) without making the API call.

  --status=(Canceled|Pending)
      (required) The status you want to set for the specified PackagePushRequest records.

  --where=where
      Alternative to providing PackagePushRequestId, updates all records that match the provided where clause.  Recommend 
      using with --preview option to review impact before executing.
```

_See code: [lib/commands/isvte/package/pushrequest/update.js](https://github.com/HoltMichael/PushPlugin/blob/v0.0.0/lib/commands/isvte/package/pushrequest/update.js)_

## `sfdx isvte:package:subscribers [-f <array>] [-w <string>] [-o <string>] [-l <integer>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Retreive all subscribers for a given Package or PackageVersion

```
USAGE
  $ sfdx isvte:package:subscribers [-f <array>] [-w <string>] [-o <string>] [-l <integer>] [-v <string>] [-u <string>] 
  [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -f, --fields=fields
      [default: 
      Id,InstalledStatus,InstanceName,MetadataPackageId,MetadataPackageVersionId,OrgKey,OrgName,OrgStatus,OrgType,ParentOr
      g] The fields from PackageSubscriber you wish to return.

  -l, --limit=limit
      Specify the maximum number of rows to return.

  -o, --orderby=orderby
      [default: OrgType DESC, InstanceName, MetadataPackageId, MetadataPackageVersionId, OrgName] Order the results, 
      supply a comma separated list of field names.  Can optionally include DESC modifier to sort in descending order.

  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername
      username or alias for the dev hub org; overrides default dev hub org

  -w, --where=where
      [default: InstalledStatus = 'i'] The SOQL where clause applied to limit the results.

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation
```

_See code: [lib/commands/isvte/package/subscribers.js](https://github.com/HoltMichael/PushPlugin/blob/v0.0.0/lib/commands/isvte/package/subscribers.js)_

## `sfdx isvte:trust:instance:list [--sort <string>] [--childproducts] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Retreive all subscribers for a given Package or PackageVersion

```
USAGE
  $ sfdx isvte:trust:instance:list [--sort <string>] [--childproducts] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  --childproducts                                                                   Include nested products. products
                                                                                    must be set.

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --sort=sort                                                                       [default: location] Sort by property
```

_See code: [lib/commands/isvte/trust/instance/list.js](https://github.com/HoltMichael/PushPlugin/blob/v0.0.0/lib/commands/isvte/trust/instance/list.js)_

## `sfdx isvte:util:split --input <filepath> --property <string> --outputdirectory <directory> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Split the records in one file into multiple output files based on a property.  A new file will be created using the property value as a suffix to the original filename.

```
USAGE
  $ sfdx isvte:util:split --input <filepath> --property <string> --outputdirectory <directory> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  --input=input                                                                     (required) The file that contains
                                                                                    the full set of records.

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --outputdirectory=outputdirectory                                                 (required) The directory to create
                                                                                    the output files in.

  --property=property                                                               (required) The property used to
                                                                                    split the output.
```

_See code: [lib/commands/isvte/util/split.js](https://github.com/HoltMichael/PushPlugin/blob/v0.0.0/lib/commands/isvte/util/split.js)_

## `sfdx isvte:util:subtract -a <filepath> -b <filepath> -k <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Subtract the records in one file from the other. input a contains all records, input b contains all records to remove.

```
USAGE
  $ sfdx isvte:util:subtract -a <filepath> -b <filepath> -k <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --inputa=inputa                                                               (required) Input A: File that
                                                                                    contains the full set of records.

  -b, --inputb=inputb                                                               (required) Input B: File that
                                                                                    contains the set of records to
                                                                                    remove from input a.

  -k, --key=key                                                                     (required) Key to match records on

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/isvte/util/subtract.js](https://github.com/HoltMichael/PushPlugin/blob/v0.0.0/lib/commands/isvte/util/subtract.js)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
