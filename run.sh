#!/bin/bash

# Run Cypress tests
npm run cy:run

# Capture the exit code of the Cypress tests
exit_code=$?

# Check if the tests failed
if [ $exit_code -ne 0 ]; then
  curl -X POST https://circleci.com/api/v2/project/github/straloohealth/oppenheimer/pipeline \
    --header "Circle-Token: $CIRCLE_TOKEN" \
    --header "content-type: application/json" \
    --data '{"parameters":{"run_workflow_test":true }}'
fi


