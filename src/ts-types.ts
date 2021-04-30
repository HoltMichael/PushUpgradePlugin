import { JsonMap } from '@salesforce/ts-types';

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

export interface SObject extends JsonMap {
    Id: string;
    CreatedById: string;
    CreatedDate: string;
    LastModifiedById: string;
    LastModifiedByDate: string;
    SystemModstamp: string;
}

export interface PackagePushJob extends SObject {
    DurationSeconds?: string;
    EndTime?: string;
    PackagePushRequestId: string;
    StartTime?: string;
    Status: string;
    SubscriberOrganizationKey: string;
}

export interface PackagePushRequest extends SObject {
    DurationSeconds?: string;
    EndTime?: string;
    PackageVersionId: string;
    ScheduledStartTime?: string;
    StartTime?: string;
    Status?: string;

    PackagePushJobs?: Array<Partial<PackagePushJob>>;
}

export interface PackageSubscriber extends SObject {
    InstalledStatus: string;
    InstanceName: string;
    MetadataPackageId: string;
    MetadataPackageVersionId: string;
    OrgKey: string;
    OrgName: string;
    OrgStatus: OrgStatus;
    OrgType: string;
    ParentOrg: string;
}

export interface CompositeTreeRequestRecordAttributes extends JsonMap {
    type: string;
    referenceId: string;
}

export interface CompositeTreeRequestRecord extends JsonMap {
    attributes: CompositeTreeRequestRecordAttributes;
}

export interface CompositeTreeRequest extends JsonMap {
    records: CompositeTreeRequestRecord[];
}

export interface CompositeTreeResponseRecord extends JsonMap {
    referenceId: string;
    id: string;
}

export interface CompositeTreeResponse extends JsonMap {
    hasErrors: boolean;
    results: CompositeTreeResponseRecord[];
}
