#!/bin/bash

echo "Setting up S3 bucket for vacation tracker app..."

# Create the bucket
awslocal s3 mb s3://johnbryce.project3.danielraz

# Set bucket policy for public read
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

# Upload initial images from the images directory to S3
echo "Uploading initial images to S3..."
cd /tmp/images
for file in *; do
  if [ -f "$file" ]; then
    echo "Uploading $file to S3..."
    awslocal s3 cp "$file" "s3://johnbryce.project3.danielraz/$file"
  fi
done

echo "S3 bucket setup complete!"