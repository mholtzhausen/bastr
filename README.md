bastr
=====

CLI string manipulation utility

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@cthru/bastr.svg)](https://npmjs.org/package/bastr)
[![Downloads/week](https://img.shields.io/npm/dw/@cthru/bastr.svg)](https://npmjs.org/package/bastr)
[![License](https://img.shields.io/npm/l/@cthru/bastr.svg)](https://github.com/nemesarial/bastr/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @cthru/bastr
$ bs COMMAND
running command...
$ bs (-v|--version|version)
@cthru/bastr/0.1.1 darwin-x64 node-v8.12.0
$ bs --help [COMMAND]
USAGE
  $ bs COMMAND
...
```
<!-- usagestop -->
# stdIn
bastr will only accept `stdIn` for content. Use it to make string modifications
on the terminal.

Examples:

```sh-session
$ echo -n "capitalize all words" | bs split " " | bs capitalize | bs join " "
>>> Capitalize All Words
```
```sh-session
$ ps | bs lineArray | bs findItem bash | bs getItem 0 | bs split -r "\s+" | bs getItem 3
>>> /usr/local/bin/bash
```
# Commands
<!-- commands -->
* [`bs capitalize`](#bs-capitalize)
* [`bs findItem TERM`](#bs-finditem-term)
* [`bs getItem [INDEX]`](#bs-getitem-index)
* [`bs help [COMMAND]`](#bs-help-command)
* [`bs join`](#bs-join)
* [`bs lineArray`](#bs-linearray)
* [`bs split DELIMITER`](#bs-split-delimiter)

## `bs capitalize`

Capitalize string or [string]

```
USAGE
  $ bs capitalize
```

_See code: [src/commands/capitalize.js](https://github.com/nemesarial/bastr/blob/v0.1.1/src/commands/capitalize.js)_

## `bs findItem TERM`

Get an Item from an array, or a character from a string

```
USAGE
  $ bs findItem TERM

ARGUMENTS
  TERM  The term to search for
```

_See code: [src/commands/findItem.js](https://github.com/nemesarial/bastr/blob/v0.1.1/src/commands/findItem.js)_

## `bs getItem [INDEX]`

Get an Item from an array, or a character from a string

```
USAGE
  $ bs getItem [INDEX]
```

_See code: [src/commands/getItem.js](https://github.com/nemesarial/bastr/blob/v0.1.1/src/commands/getItem.js)_

## `bs help [COMMAND]`

display help for bs

```
USAGE
  $ bs help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `bs join`

Join multiple array elements together

```
USAGE
  $ bs join

OPTIONS
  -g, --glue=glue  [default:  ] glue to use on join
```

_See code: [src/commands/join.js](https://github.com/nemesarial/bastr/blob/v0.1.1/src/commands/join.js)_

## `bs lineArray`

Split string into array

```
USAGE
  $ bs lineArray
```

_See code: [src/commands/lineArray.js](https://github.com/nemesarial/bastr/blob/v0.1.1/src/commands/lineArray.js)_

## `bs split DELIMITER`

Split string into array

```
USAGE
  $ bs split DELIMITER

ARGUMENTS
  DELIMITER  [default:  ] Delimiter to use as split point

OPTIONS
  -r, --regex  Delimiter is regex
```

_See code: [src/commands/split.js](https://github.com/nemesarial/bastr/blob/v0.1.1/src/commands/split.js)_
<!-- commandsstop -->
