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
isvte-packagepushplugin/0.0.0 darwin-x64 node-v10.13.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx isvte:package:pushrequest:create -p <string> [-t <datetime>] [-o <array>] [-s <filepath>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-isvtepackagepushrequestcreate--p-string--t-datetime--o-array--s-filepath--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx isvte:package:pushrequest:listjobs [-r <string>] [-s <array>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-isvtepackagepushrequestlistjobs--r-string--s-array--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx isvte:package:pushrequest:listrequests [-v <string>] [-s <array>] [-f] [-d <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-isvtepackagepushrequestlistrequests--v-string--s-array--f--d-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx isvte:package:pushrequest:subscribers [-p <string>] [-v <string>] [--orgtype <array>] [--orgstatus <array>] [-o <array>] [--anyinstallstatus] [-d <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-isvtepackagepushrequestsubscribers--p-string--v-string---orgtype-array---orgstatus-array--o-array---anyinstallstatus--d-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx isvte:package:pushrequest:update -s Canceled|Pending [-c | -r <array>] [-p | undefined] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-isvtepackagepushrequestupdate--s-canceledpending--c---r-array--p--undefined--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx isvte:package:pushrequest:create -p <string> [-t <datetime>] [-o <array>] [-s <filepath>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Create PackagePushRequest and associated PackagePushJob records.

```
USAGE
  $ sfdx isvte:package:pushrequest:create -p <string> [-t <datetime>] [-o <array>] [-s <filepath>] [-v <string>] [-u 
  <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -o, --organisationid=organisationid
      Single org ID to create a push request for.

  -p, --packageversion=packageversion
      (required) PackageVersionID to upgrade the subscriber to.

  -s, --subscriberorgidfile=subscriberorgidfile
      JSON File of Subscribers to create a push request for.

  -t, --scheduledstarttime=scheduledstarttime
      The date and time (UTC) at which the push request is processed, in ISO 8601 format. Set this value to the earliest 
      time that you want Salesforce to attempt to start the push. As a best practice, schedule pushes at off-peak hours 
      like 1:00 AM Saturday. If you don’t specify a value, the push starts when the package push request’s Status is set 
      to Pending.

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
```

_See code: [lib/commands/isvte/package/pushrequest/create.js](https://github.com/HoltMichael/PushPlugin/blob/v0.0.0/lib/commands/isvte/package/pushrequest/create.js)_

## `sfdx isvte:package:pushrequest:listjobs [-r <string>] [-s <array>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

List PackagePushRequest records.

```
USAGE
  $ sfdx isvte:package:pushrequest:listjobs [-r <string>] [-s <array>] [-v <string>] [-u <string>] [--apiversion 
  <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -r, --pushrequest=pushrequest                                                     PackageVersionID that subscribers
                                                                                    have installed.

  -s, --status=status                                                               The status you want to set for the
                                                                                    specified PackagePushRequest
                                                                                    records.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/isvte/package/pushrequest/listjobs.js](https://github.com/HoltMichael/PushPlugin/blob/v0.0.0/lib/commands/isvte/package/pushrequest/listjobs.js)_

## `sfdx isvte:package:pushrequest:listrequests [-v <string>] [-s <array>] [-f] [-d <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

List PackagePushRequest records.

```
USAGE
  $ sfdx isvte:package:pushrequest:listrequests [-v <string>] [-s <array>] [-f] [-d <string>] [-v <string>] [-u 
  <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --directoryforsave=directoryforsave                                           Directory to store the subscriber
                                                                                    information pulled from your DevHub

  -f, --createfile                                                                  Boolean - should these results be
                                                                                    added to a JSON file. Useful for
                                                                                    updating or cancelling push requests
                                                                                    in a future command.

  -s, --status=status                                                               The status you want to set for the
                                                                                    specified PackagePushRequest
                                                                                    records.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --packageversion=packageversion                                               PackageVersionID that subscribers
                                                                                    have installed.

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/isvte/package/pushrequest/listrequests.js](https://github.com/HoltMichael/PushPlugin/blob/v0.0.0/lib/commands/isvte/package/pushrequest/listrequests.js)_

## `sfdx isvte:package:pushrequest:subscribers [-p <string>] [-v <string>] [--orgtype <array>] [--orgstatus <array>] [-o <array>] [--anyinstallstatus] [-d <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Retreive all subscribers for a given Package or PackageVersion

```
USAGE
  $ sfdx isvte:package:pushrequest:subscribers [-p <string>] [-v <string>] [--orgtype <array>] [--orgstatus <array>] [-o 
  <array>] [--anyinstallstatus] [-d <string>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --directoryforsave=directoryforsave
      Directory to store the subscriber information pulled from your DevHub

  -o, --orderby=orderby
      [default: OrgType DESC,InstanceName,MetadataPackageId,MetadataPackageVersionId,OrgName] Order the results, supply a 
      comma separated list of field names.  Can optionally include DESC modifier to sort in descending order.

  -p, --package=package
      PackageID that subscribers have installed.

  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -v, --packageversion=packageversion
      PackageVersionID that subscribers have installed.

  -v, --targetdevhubusername=targetdevhubusername
      username or alias for the dev hub org; overrides default dev hub org

  --anyinstallstatus
      Include PackageSubscriber records with any value for InstalledStatus, by default results are restricted to only 'i', 
      or where the package is installed.

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --orgstatus=orgstatus
      Filter results by org status, supply a comma separated list of OrgStatus.

  --orgtype=orgtype
      Filter results by org type, supply a comma separated list of OrgTypes.
```

_See code: [lib/commands/isvte/package/pushrequest/subscribers.js](https://github.com/HoltMichael/PushPlugin/blob/v0.0.0/lib/commands/isvte/package/pushrequest/subscribers.js)_

## `sfdx isvte:package:pushrequest:update -s Canceled|Pending [-c | -r <array>] [-p | undefined] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Pushes a package upgrade to a specified org

```
USAGE
  $ sfdx isvte:package:pushrequest:update -s Canceled|Pending [-c | -r <array>] [-p | undefined] [-v <string>] [-u 
  <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --allcreated                                                                  Alternative to providing
                                                                                    PackagePushRequestIds, updates all
                                                                                    records that have status 'Created'.

  -p, --allpending                                                                  Alternative to providing
                                                                                    PackagePushRequestIds, updates all
                                                                                    records that have status 'Pending'.

  -r, --packagepushrequests=packagepushrequests                                     Comma separated list of
                                                                                    PackagePushRequestIds to update.
                                                                                    Cannot be used in conjunction with
                                                                                    --allcreated, or --allpending flags.

  -s, --status=(Canceled|Pending)                                                   (required) The status you want to
                                                                                    set for the specified
                                                                                    PackagePushRequest records.

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/isvte/package/pushrequest/update.js](https://github.com/HoltMichael/PushPlugin/blob/v0.0.0/lib/commands/isvte/package/pushrequest/update.js)_
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
