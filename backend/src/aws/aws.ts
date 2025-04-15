import { CreateBucketCommand, HeadBucketCommand, PutBucketPolicyCommand, S3Client } from '@aws-sdk/client-s3'
import config from 'config'

const s3Config = JSON.parse(JSON.stringify(config.get('s3.connection')))
if (!config.get<boolean>('s3.isLocalstack')) delete s3Config.endpoint

const s3Client = new S3Client(s3Config)

export async function createAppBucketIfNotExists() {
    const bucketName = config.get<string>('s3.bucket');
    try {
        // Check if bucket exists
        await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
        console.log(`Bucket ${bucketName} already exists`);
    } catch (error) {
        // Create bucket if it doesn't exist
        try {
            console.log(`Creating bucket ${bucketName}...`);
            await s3Client.send(new CreateBucketCommand({ 
                Bucket: bucketName 
            }));
            
            // Set public read policy
            await s3Client.send(new PutBucketPolicyCommand({
                Bucket: bucketName,
                Policy: JSON.stringify({
                    Version: '2012-10-17',
                    Statement: [{
                        Sid: 'PublicReadGetObject',
                        Effect: 'Allow',
                        Principal: '*',
                        Action: 's3:GetObject',
                        Resource: `arn:aws:s3:::${bucketName}/*`
                    }]
                })
            }));
            
            console.log(`Bucket ${bucketName} created and configured successfully`);
        } catch (createError) {
            console.error('Error creating bucket:', createError);
        }
    }
}

export default s3Client