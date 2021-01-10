#!/bin/bash

#aws s3 sync build/ s3://vobu.chwyean.com/ --exclude "*-test.csv" --storage-class STANDARD --delete --dryrun
aws s3 sync build/ s3://vobu.chwyean.com/ --exclude "*-test.csv" --storage-class STANDARD --delete

