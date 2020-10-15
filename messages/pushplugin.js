module.exports = {
  // isvte.package.pushrequest.create
  createDescription: "Create PackagePushRequest and associated PackagePushJob records.",
  packageVersionFlagDescription: "PackageVersionID to upgrade the subscriber to.",
  scheduledStartTimeFlagDescription: "The date and time (UTC) at which the push request is processed, in ISO 8601 format. Set this value to the earliest time that you want Salesforce to attempt to start the push. As a best practice, schedule pushes at off-peak hours like 1:00 AM Saturday. If you don’t specify a value, the push starts when the package push request’s Status is set to Pending.",
  subscriberorgidsFlagDescription: "JSON File of Subscribers to create a push request for.",
  organisationidFlagDescription: "Single org ID to create a push request for.",

  // isvte.package.pushrequest.listrequests
  packagePushRequestListDescription: 'List PackagePushRequest records.',
  fileFlagDescription: 'Boolean - should these results be added to a JSON file. Useful for updating or cancelling push requests in a future command.',
  statusRequestFlagDescription: 'The status of the push requests being queried.',
  
  // isvte.package.pushrequest.update
  updateDescription: "Pushes a package upgrade to a specified org",
  packagepushrequestsFlagDescription: "Comma separated list of PackagePushRequestIds to update.  Cannot be used in conjunction with --allcreated, or --allpending flags.",
  allcreatedFlagDescription: "Alternative to providing PackagePushRequestIds, updates all records that have status 'Created'.",
  allpendingFlagDescription: "Alternative to providing PackagePushRequestIds, updates all records that have status 'Pending'.",
  statusFlagDescription: "The status you want to set for the specified PackagePushRequest records.",

  // isvte.package.subsribers
  subscribersDescription: "Retreive all subscribers for a given Package or PackageVersion",
  packageFlagDescription: "PackageID that subscribers have installed.",
  packageversionFlagDescription: "PackageVersionID that subscribers have installed.",
  directoryFlagDescription: "Directory to store the subscriber information pulled from your DevHub",

  anyinstallstatusFlagDescription: 'Include PackageSubscriber records with any value for InstalledStatus, by default results are restricted to only \'i\', or where the package is installed.',
  orgtypeFlagDescription:'Filter results by org type, supply a comma separated list of OrgTypes.',
  orgstatusFlagDescription: 'Filter results by org status, supply a comma separated list of OrgStatus.',
  orderbyFlagDescription: 'Order the results, supply a comma separated list of field names.  Can optionally include DESC modifier to sort in descending order.',
  packageFlagDescription: 'PackageID that subscribers have installed.',
  packageversionFlagDescription: 'PackageVersionID that subscribers have installed.'
  
}
