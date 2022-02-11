#!/usr/bin/env bash
IMAGE=data-importer
TAG=${1:-latest}
docker build --tag $IMAGE:$TAG .
aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin 291845142233.dkr.ecr.eu-west-3.amazonaws.com
docker tag $IMAGE:$TAG 291845142233.dkr.ecr.eu-west-3.amazonaws.com/$IMAGE:$TAG
docker push 291845142233.dkr.ecr.eu-west-3.amazonaws.com/$IMAGE:$TAG
