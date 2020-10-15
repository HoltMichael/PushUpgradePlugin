// import { string } from '@oclif/command/lib/flags';
import { JsonMap } from '@salesforce/ts-types';
import { Connection } from 'jsforce';
import { OrderByArguments, OrderByExpression, SoqlHelper } from '../src/soqlHelper';

export enum OrgType {
    Production,
    Sandbox
}

export enum OrgStatus {
    Active,
    Demo,
    Free,
    Inactive,
    Trial
}

export enum PackagePushStatus {
    Canceled = 'Canceled',
    Created = 'Created',
    Failed = 'Failed',
    InProgress = 'In progress',
    Pending = 'Pending',
    Succeeded = 'Succeeded'
}

export interface CompositeTreeResponseRecord extends JsonMap {
    referenceId: string;
    id: string;
}

export interface CompositeTreeResponse extends JsonMap {
    hasErrors: boolean;
    results: CompositeTreeResponseRecord[];
}

export interface PackagePushRequest extends JsonMap {
    Id?: string;
    PackageVersionId: string;
    ScheduledStartTime?: string;
    Status?: string;
}

export interface PackageSubscriber extends JsonMap {
    InstalledStatus: string;
    InstanceName: string;
    MetadataPackageId: string;
    MetadataPackageVersionId: string;
    OrgKey: string;
    OrgName: string;
    OrgStatus: string;
    OrgType: string;
    ParentOrg: string;
}

export async function QueryPackagePushRequest(conn: Connection, packageVersionId: string, scheduledStartTime: Date, statuses: PackagePushStatus[]) {
    // Prepare the filter expressions
    const filterExpressions: string[] = [];
    if (packageVersionId || scheduledStartTime || statuses) {
      if (packageVersionId) filterExpressions.push(SoqlHelper.formatEqualsFilterExpression('PackageVersionId', this.flags.packageversion));
      if (scheduledStartTime) filterExpressions.push(SoqlHelper.formatEqualsFilterExpression('ScheduledStartTime', this.flags.packageversion));
      if (statuses) filterExpressions.push(SoqlHelper.formatInFilterExpression('Status', statuses));
    }

    // Generate the SOQL query
    const fieldNames: string[] = ['id', 'packageVersionId', 'scheduledStartTime', 'status'];
    const soql: string = SoqlHelper.formatSoql('PackagePushRequest', fieldNames, filterExpressions);

    // Execute the query
    const output = await conn.query<PackagePushRequest>(soql);
    return output;
}

export async function QueryPackageSubscribers(conn: Connection, packageId: string, packageVersionId: string, anyinstalledstatus: boolean, orgTypes: string[], orgStatuses: string[], orderBy: string[]) {
    // Prepare the filter expressions
    const filterExpressions: string[] = [];
    if (packageId || packageVersionId || orgTypes || orgStatuses) {
        if (packageVersionId) filterExpressions.push(SoqlHelper.formatEqualsFilterExpression('metadataPackageVersionId)', packageVersionId));
        else if (packageId) filterExpressions.push(SoqlHelper.formatEqualsFilterExpression('metadataPackageId', packageId));

        if (orgTypes) filterExpressions.push(SoqlHelper.formatInFilterExpression('orgType', orgTypes));
        if (orgStatuses) filterExpressions.push(SoqlHelper.formatInFilterExpression('orgStatuses', orgTypes));
    }

    if (!anyinstalledstatus) filterExpressions.push(SoqlHelper.formatEqualsFilterExpression('installedStatus', 'i'));

    // Generate the SOQL query
    const fieldNames: string[] = ['id', 'installedStatus', 'instanceName', 'metadataPackageId', 'metadataPackageVersionId', 'orgKey', 'orgName', 'orgStatus', 'orgType', 'parentOrg'];
    const orderByArgs: OrderByArguments = {expressions: orderBy.map(item => (OrderByExpression.parse(item))), nullsLast: false};
    const soql: string = SoqlHelper.formatSoql('PackageSubscriber', fieldNames, filterExpressions, orderByArgs);

    // Execute the query
    const output = await conn.query<PackageSubscriber>(soql);
    return output;
}