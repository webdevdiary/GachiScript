# GachiScript
A programming language that transpiles to JavaScript

## Current state
There is only one function:
```GachiScript
spank('your text here')
```
The JavaScript result will be:
```js
alert('your text here')
```

## How to try current state

```shell script
# install dependencies
$ npm install

# build GachiScript transpiler
$ npm run build

# transpile examples/HelloWorld/index.gachi file to JavaScript
$ npm run transpile -- gachiModule="examples/HelloWorld" outputDir="examples/HelloWorld/dist"

# result file: examples/HelloWorld/dist/index.js
```

## Other commands

```shell script
# lint ts files
$ npm run lint
```


About project & team
---
Special thanks to Viskhan Supaev for taking part of the idea creation

We are developers from https://vk.com/webdevdiary, and we work with this project just for fun
