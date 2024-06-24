import { Stack, StackProps, Duration, RemovalPolicy, CfnOutput, Token, Lazy, EncodingOptions, Fn } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'; 
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import { EdgeFunction } from 'aws-cdk-lib/aws-cloudfront/lib/experimental';
export class main extends Stack {
  public fnUrl: string

  //BeginStackDefinition
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const lifecycleRuleDefault: s3.LifecycleRule = {
      id: 'lifecycleRuleDefault',
      enabled: true,
      abortIncompleteMultipartUploadAfter: cdk.Duration.minutes(30),
      expiredObjectDeleteMarker: false,
      noncurrentVersionExpiration: cdk.Duration.minutes(30),
      prefix: 'backups/',
    };

    const lifecycleRuleDaily: s3.LifecycleRule = {
      id: 'lifecycleRuleDaily',
      enabled: true,
      expiration: cdk.Duration.days(7),
      prefix: 'backups/daily/',
    };

    const lifecycleRuleWeekly: s3.LifecycleRule = {
      id: 'lifecycleRuleWeekly',
      enabled: true,
      expiration: cdk.Duration.days(30),
      expiredObjectDeleteMarker: false,
      prefix: 'backups/weekly/',
    };

    const lifecycleRuleMonthly: s3.LifecycleRule = {
      id: 'lifecycleRuleMonthly',
      enabled: true,
      expiration: cdk.Duration.days(365),
      expiredObjectDeleteMarker: false,
      prefix: 'backups/monthly/',
    };

    const s3Bucket = new s3.Bucket(this, 'smarthome', {
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      lifecycleRules: [
        lifecycleRuleDefault,
        lifecycleRuleDaily,
        lifecycleRuleWeekly,
        lifecycleRuleMonthly
      ]
    });

    s3Bucket.grantRead(new iam.AccountRootPrincipal());
    s3Bucket.grantPut(new iam.AccountRootPrincipal());
    
  }}
          
