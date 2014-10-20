# Muzzley manager generator

## What is this?

This is a [Yeoman Generator](http://yeoman.io/) that quickly and effortlessly builds a muzzley Thing Manager app structure.

### "What is a Thing Manager?" you may ask

Well, you can think of a **Thing Manager** as a "_thing control remote_" app that runs in the Muzzley ecosystem.

## Installation

First, you need to have Yeoman installed globally. If you don't have it you can run this in your terminal:

```bash
npm install -g yo
```

Then you need to install the muzzley manager generator:

```bash
npm install -g generator-muzzley-manager
```

## How to use?

Run this in your terminal

```bash
yo muzzley-manager
```

## Questions

When you run the generator it will ask a few questions to generate custom boilerplate for your project. The following questions will be asked:

### > *What is the name of the device?*

#### Possible answers

Anything you want.

#### What it does?

* Create a directory with the name of the device, for e.g. if you call it `awesome`, you'll get `manager-awesome/`
* Write to multiple files (`config.js` env variables, plugin handlers) the name of your device

### > *Do you want to use a third-party module for the provider logic?*

##### Note: The generator is asking if there's already an npm module that can handle aspects of your "thing" such as the communication with its cloud.

#### Possible answers

* Yes
* No

#### What it does?

**If you answer `Yes`**

It will ask the name of this npm module to add to the dependencies in `package.json`.

**If you answer `No`**

It will ask if you want to build a local npm module, to keep muzzley manager business logic separated from provider business logic.

If you answer `Yes`, it will create a a directory in the root of your app directory called `provider_module`.


#### When you finish it will generate the boilerplate and install the dependencies

## App structure

You will get a structure similar to this:

>  - manager-[thing-name]/
>   - lib/
>      - interaction/
>      - models/
>      - plugins/
>      - provider/
>   - production/
>   - provider_module/
>   - public/
>   - test/
>   - docs/
>   - index.js
>   - config.js
>   - Gruntfile.js

The core dependencies of the generator is the [muzzley-idk]() and [muzzley-client](). If you don't know _what the hell those are_, we suggest that you read the documentation of both packages.

The main dependencies that generator installs are the following:

- [hapi](http://hapijs.com/)
- [async](https://github.com/caolan/async)
- [boom](https://github.com/hapijs/boom)
- [grunt](http://gruntjs.com/)
- [joi](https://github.com/hapijs/joi)
- [lodash](https://lodash.com/)
- [bunyan](https://github.com/trentm/node-bunyan)
- [request](https://github.com/mikeal/request)

> **Note:** If one of these dependencies doesn't ring a bell, please check them out because you will need to have basic knowledge on what they do and how to use them.

## Explaining lib in more detail

First when we talk about _provider_, we are referring to the manafacturer, and in most cases that person will be _you_ or someone else who is reading this.

When we say, _provider business logic_, we are referring to the cloud/web service the _thing_ is pushing information to or/and receiving information from.

### Interaction

Interactions are full-duplex real-time communication using sockets and the muzzley protocol. You can read more about that [here](https://www.muzzley.com/documentation/integration/thing-manager.html#muzzley_client).

### Models

This are representations of muzzley business logic and the way information should be stored. You have the following models:

* `Channel`: This is represents an _instance_ of your _thing_, it can be a sensor, a piece of hardware, or even you or your cat.
* `Credentials`: Normally, the credentials are represented as an access token that give access to the provider API endpoints.
* `Subscription`: This represents a user/channel relationship.

### Plugins

Plugins are isolated pieces of business logic and reusable utilities used in [hapi](http://hapijs.com/). Read more about plugins [here](http://hapijs.com/tutorials/plugins).

### Provider

This is a wrapper used to communicate with the http server and the muzzley client, using provider business logic. It also stores and retrieves information from a local _thing storage_.
