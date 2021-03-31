module.exports = {
  // isvte:package:pushrequest:create
  isvte_package_pushrequest_create__Description: 'Create PackagePushRequest and associated PackagePushJob records.',
  isvte_package_pushrequest_create__packageVersionFlagDescription: 'PackageVersionID to upgrade the subscriber to.',
  isvte_package_pushrequest_create__scheduledStartTimeFlagDescription: 'The date and time (UTC) at which the push request is processed, in ISO 8601 format. Set this value to the earliest time that you want Salesforce to attempt to start the push. As a best practice, schedule pushes at off-peak hours like 1:00 AM Saturday. If you don’t specify a value, the push starts when the package push request’s Status is set to Pending.',
  isvte_package_pushrequest_create__subscriberidsFlagDescription: 'Comma separated list of subscriber org ids, to create associated PackagePushJobs for.',
  isvte_package_pushrequest_create__subscribersfileFlagDescription: 'Path to JSON file of subscriber org ids, to create associated PackagePushJobs for.  Expects array of objects such as {OrgKey: \'XXXXXXXXXXXXX\'}',
  isvte_package_pushrequest_create__previewFlagDescription: 'Preview the records to be created (JSON) without making the API call.',

  // isvte:package:pushrequest:list
  isvte_package_pushrequest_list__Description: 'List PackagePushRequest records.',
  isvte_package_pushrequest_list__fieldsFlagDescription: 'The fields from PackagePushRequest you wish to return.',
  isvte_package_pushrequest_list__whereFlagDescription: 'The SOQL where clause applied to limit the results.',
  isvte_package_pushrequest_list__orderbyFlagDescription: 'Order the results, supply a comma separated list of field names.  Can optionally include DESC modifier to sort in descending order.',
  isvte_package_pushrequest_list__limitFlagDescription: 'Specify the maximum number of rows to return.',
  isvte_package_pushrequest_list__includejobsFlagDescription: 'Retrieve the child PackagePushJob records linked to the requested PackagePushRequests.',
  
  // isvte:package:pushrequest:update
  isvte_package_pushrequest_update__Description: 'Pushes a package upgrade to a specified org',
  isvte_package_pushrequest_update__packagepushrequestsFlagDescription: 'PackagePushRequestId to update.  Cannot be used in conjunction with --allcreated, or --allpending flags.',
  isvte_package_pushrequest_update__whereFlagDescription: 'Alternative to providing PackagePushRequestId, updates all records that match the provided where clause.  Recommend using with --preview option to review impact before executing.',
  isvte_package_pushrequest_update__statusFlagDescription: 'The status you want to set for the specified PackagePushRequest records.',
  isvte_package_pushrequest_update__previewFlagDescription: 'Preview the update request (JSON) without making the API call.',

  // isvte:package:subscribers
  isvte_package_subscribers__Description: 'Retreive all subscribers for a given Package or PackageVersion',
  isvte_package_subscribers__fieldsFlagDescription: 'The fields from PackageSubscriber you wish to return.',
  isvte_package_subscribers__whereFlagDescription: 'The SOQL where clause applied to limit the results.',
  isvte_package_subscribers__orderbyFlagDescription: 'Order the results, supply a comma separated list of field names.  Can optionally include DESC modifier to sort in descending order.',
  isvte_package_subscribers__limitFlagDescription: 'Specify the maximum number of rows to return.',
  
  // isvte:trust:instances:list
  isvte_trust_instance_list__Description: 'Retreive all subscribers for a given Package or PackageVersion',
  isvte_trust_instance_list__sortFlagDescription: 'Sort by property',
  isvte_trust_instance_list__childproductsFlagDescription: 'Include nested products. products must be set.',

  // isvte:util:split
  isvte_util_split_Description: 'Split the records in one file into multiple output files based on a property.  A new file will be created using the property value as a suffix to the original filename.',
  isvte_util_split_inputFlagDescription: 'The file that contains the full set of records.',
  isvte_util_split_propertyFlagDescription: 'The property used to split the output.',
  isvte_util_split_outputdirectoryFlagDescription: 'The directory to create the output files in.',
  
  // isvte:util:subtract
  isvte_util_subtract_Description: 'Subtract the records in one file from the other. input a contains all records, input b contains all records to remove.',
  isvte_util_subtract_inputaFlagDescription: 'Input A: File that contains the full set of records.',
  isvte_util_subtract_inputbFlagDescription: 'Input B: File that contains the set of records to remove from input a.',
  isvte_util_subtract_keyFlagDescription: 'Key to match records on',
  isvte_util_subtract_outputfileFlagDescription: 'File to write the output of A - B into.'
}
