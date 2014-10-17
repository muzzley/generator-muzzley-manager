# Muzzley manager generator

## What is this?
This is a [yeoman generator](http://yeoman.io/) , that quickly builds, effortlessly, a thing manager app structure.

### *"What is a Thing manager?"* you may ask
Well, you can think of a **Thing manager** as a "*thing control remote*" app that runs in Muzzley ecosystem.

## Installation
First you need to have yeoman installed globally, if you don't have it you can run this in your terminal
```bash
npm install -g yo
```
&nbsp;

Then you need to install muzzley-manager-generator
```bash
npm install -g generator-muzzley-manager
```

## How to use?
Run this in your terminal
```bash
yo muzzley-manager
```
## Questions

When you run the generator it will ask a few questions, to generate custom boilerplate for your project, the following questions will be asked

### > *What is the name of the device?*

#### Possible answers
Anything you want

#### What it does?
- Create a directory with the name of the device, for e.g. if you call it `awesome`, you'll get manager-awesome
- Write to multiple files (config.js env variables, plugin handlers) the name of your device

### > *Do you want to use a third-party module for the provider logic?*
##### Note: What generator is asking is if exists any npm module, that already, for e.g., connects to your "thing" cloud, that push some specific action, etc .. 

#### Possible answers
- Yes
- No

#### What it does?
**If you answer `Yes`**

It will ask the name of this npm module to add to the dependencies in `package.json`

**If you answer `No`**

It will ask if you want to build a local npm module, to keep muzzley manager business logic separated from provider business logic.

If you answer `Yes`, it will create a a directory in the root of your app directory called `provider_module`


#### **When you finish it will generate the boilerplate and install the dependencies**

## App structure

You will get a structure similar to this

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

The core dependencies of the generator is the [muzzley-idk]() and [muzzley-client](), If you don't know ***what the hell are those***, We suggest that you read the documentation of both packages

The main dependencies that generator installs are the following

- [hapi](http://hapijs.com/)
- [async](https://github.com/caolan/async)
- [boom](https://github.com/hapijs/boom)
- [grunt](http://gruntjs.com/)
- [joi](https://github.com/hapijs/joi)
- [lodash](https://lodash.com/)
- [bunyan](https://github.com/trentm/node-bunyan)
- [request](https://github.com/mikeal/request)

> **Note:** If one of these dependencies doesn't ring a bell, please check them out, because you will need to have basic knowledge on ***what they do*** and ***how to use them***

## Explaining lib in more detail

First when we talk about ***provider***, we are referring to the manafacturer, and in most cases that person will be **you** or someone else who is reading this.

When we say, ***provider business logic***, we are referring to the cloud/web service the ***thing*** is pushing information to or/and recieving information from.

### Interaction
Interactions are real-time communication using sockets, in muzzley protocol, you can read more about that [here]({{site.baseUri}}/integration/thing-manager.html#muzzley_client)

### Models
This are representations of Muzzley business logic, and the way information should be stored, you have the following models

- `Channel` - This is represents your ***thing***, it can be your cat, you, a sensor, a piece of hardware it can be basically anything
- `Credentials` - Normally, this credential is represented as an access token that give access to the provider API endpoints
- `Subscription` - This is user-channel relationship

### Plugins
Plugins are solated pieces of business logic, and reusable utilities, used in hapi.

Read more about plugins [here](http://hapijs.com/tutorials/plugins)

### Provider
This is a wrapper used to communicate with Http server and Muzzley client, using provider business logic, it also stores and retrieves information from a local ***thing storage***
