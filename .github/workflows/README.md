# CI/CD

Here we implemented a CI/CD flow with three important steps: build, test and deploy. They are sequential so they don't fire before all of the previous ones finish positively. It is implemented for push events on the main branch but we could also add other events in the future.

## Build

It uses two popular github actions to checkout to our directory and to setup node version. Targeted node version here is 16 even though the app was made on 18.8.0 node.js version. Then it clean installs and builds

## Test

If the build phase succeeds we go to the test phase. Here the flow is the same except for the final command.

## Deploy

If the test phase succeeds we go to the deploy phase. Here we're using the action FirebaseExtended/action-hosting-deploy@v0, which deploys every time to a different url. It uses some keys created through their command line tool. Here we added the creation of the unique string for every time to be based on the commit SHA, which is not maybe pretty but it is quick.
