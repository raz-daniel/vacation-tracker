#!/bin/bash
set -e

echo "Waiting for LocalStack to start..."
sleep 15

echo "Creating S3 bucket..."
awslocal s3 mb s3://johnbryce.project3.danielraz

echo "Uploading images to S3 bucket..."
# Upload all images from the /tmp/images directory
for file in /tmp/images/*; do
  filename=$(basename "$file")
  echo "Uploading $filename to S3..."
  awslocal s3 cp "$file" "s3://johnbryce.project3.danielraz/$filename"
done

echo "Making all objects in the bucket public-readable..."
awslocal s3api put-bucket-policy --bucket johnbryce.project3.danielraz --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::johnbryce.project3.danielraz/*"
    }
  ]
}'

echo "S3 bucket initialization complete!"