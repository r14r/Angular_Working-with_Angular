# Angular 9

## Install Angular 9

    npm -g install yarn

    npm install --global @angular/cli@next

## Install additional rquirements

### Prettier and TSLint

    npm install --save-dev tslint-config-prettier

Extend tslint.json

    {
        “extends”: [
            “tslint:latest”,
            “tslint-config-prettier”
        ]
    }

### Bazel

On Mac OS

    brew tap bazelbuild/tap
    brew install bazelbuild/tap/bazel

### Create new App

    ng new App
    cd App

## Start App

    ng serve

## Add Modules

    ng g module auth
    ng g module vehicles
    ng g module insurance
    ng g module employees
    ng g module clients

## Add Components

    ng generate component components/insurance/policy-list

    ng generate component components/insurance/policy-create
    ng generate component components/insurance/policy-update
    ng generate component components/insurance/payment-create
    ng generate component components/insurance/coverage-create

    ng generate component components/vehicles/vehicle-list
    ng generate component components/vehicles/vehicle-create
    ng generate component components/vehicles/vehicle-update

    ng generate component components/employees/employee-list
    ng generate component components/employees/employee-create
    ng generate component components/employees/employee-update

    ng generate component components/clients/client-list
    ng generate component components/clients/client-create
    ng generate component components/clients/client-update

    ng generate component components/auth/login
    ng generate component components/auth/register

## Add Material Design

    npm install --save @angular/material @angular/cdk
    npm install --save hammerjs
    npm install --save @angular/animations

## Add Material DEsign Schematics samples

    ng generate @angular/material:address-form  address-form
    ng generate @angular/material:nav           nav
    ng generate @angular/material:table         table
    ng generate @angular/material:dashboard     dashboard
    ng generate @angular/material:tree          tree
    ng generate @angular/cdk:drag-drop          drag-drop

## Working with Angular 9

```

```
