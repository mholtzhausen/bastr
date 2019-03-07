bastr
=====

CLI string manipulation utility

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@cthru/bastr.svg)](https://npmjs.org/package/@cthru/bastr)
[![Downloads/week](https://img.shields.io/npm/dw/@cthru/bastr.svg)](https://npmjs.org/package/@cthru/bastr)
[![License](https://img.shields.io/npm/l/@cthru/bastr.svg)](https://github.com/nemesarial/bastr/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Example Usage](#example-usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @cthru/bastr
$ (someProcess) | bs COMMAND
running command...
$ bs (-v|--version|version)
@cthru/bastr/0.1.6 darwin-x64 node-v10.10.0
$ bs --help [COMMAND]
USAGE
  $ (someProcess) | bs COMMAND
...
```
<!-- usagestop -->
# Example Usage
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
* [`(someProcess) | bs capitalize`](#someprocess--bs-capitalize)
* [`(someProcess) | bs findItem TERM`](#someprocess--bs-finditem-term)
* [`(someProcess) | bs getItem [INDEX]`](#someprocess--bs-getitem-index)
* [`(someProcess) | bs help [COMMAND]`](#someprocess--bs-help-command)
* [`(someProcess) | bs join [GLUE]`](#someprocess--bs-join-glue)
* [`(someProcess) | bs replace SEARCHTERM REPLACETERM`](#someprocess--bs-replace-searchterm-replaceterm)
* [`(someProcess) | bs split DELIMITER`](#someprocess--bs-split-delimiter)
* [`(someProcess) | bs toArray`](#someprocess--bs-toarray)

## `(someProcess) | bs capitalize`

Capitalizes string or [string]

```
USAGE
  $ (someProcess) | bs capitalize

OPTIONS
  -a, --all           Target all letters, not just first
  -d, --decapitalize  De-Capitalize instead

ALIASES
  $ (someProcess) | bs cap
```

_See code: [src/commands/capitalize.js](https://github.com/nemesarial/bastr/blob/v0.1.6/src/commands/capitalize.js)_

## `(someProcess) | bs findItem TERM`

Get an Item from an array, or a character from a string

```
USAGE
  $ (someProcess) | bs findItem TERM

ARGUMENTS
  TERM  The term to search for

ALIASES
  $ (someProcess) | bs search
  $ (someProcess) | bs filter
  $ (someProcess) | bs find
```

_See code: [src/commands/findItem.js](https://github.com/nemesarial/bastr/blob/v0.1.6/src/commands/findItem.js)_

## `(someProcess) | bs getItem [INDEX]`

Get an Item from an array, or a character from a string

```
USAGE
  $ (someProcess) | bs getItem [INDEX]

ALIASES
  $ (someProcess) | bs get
  $ (someProcess) | bs select
```

_See code: [src/commands/getItem.js](https://github.com/nemesarial/bastr/blob/v0.1.6/src/commands/getItem.js)_

## `(someProcess) | bs help [COMMAND]`

display help for bs

```
USAGE
  $ (someProcess) | bs help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `(someProcess) | bs join [GLUE]`

Join multiple array elements together

```
USAGE
  $ (someProcess) | bs join [GLUE]

ARGUMENTS
  GLUE  [default:  ] Glue to use for join
```

_See code: [src/commands/join.js](https://github.com/nemesarial/bastr/blob/v0.1.6/src/commands/join.js)_

## `(someProcess) | bs replace SEARCHTERM REPLACETERM`

Replaces Values in strings or arrays

```
USAGE
  $ (someProcess) | bs replace SEARCHTERM REPLACETERM

ARGUMENTS
  SEARCHTERM   The term to search for
  REPLACETERM  The term to replace searchTerm with

OPTIONS
  -c, --casesensitive  match only case sensitive occurances
  -f, --first          only replace the first occurance
  -r, --regex          use regular expression in search term
```

_See code: [src/commands/replace.js](https://github.com/nemesarial/bastr/blob/v0.1.6/src/commands/replace.js)_

## `(someProcess) | bs split DELIMITER`

Split string into array

```
USAGE
  $ (someProcess) | bs split DELIMITER

ARGUMENTS
  DELIMITER  [default:  ] Delimiter to use as split point

OPTIONS
  -r, --regex  Delimiter is regex
```

_See code: [src/commands/split.js](https://github.com/nemesarial/bastr/blob/v0.1.6/src/commands/split.js)_

## `(someProcess) | bs toArray`

Split string into array

```
USAGE
  $ (someProcess) | bs toArray

ALIASES
  $ (someProcess) | bs lineSplit
  $ (someProcess) | bs line2array
  $ (someProcess) | bs lineArray
```

_See code: [src/commands/toArray.js](https://github.com/nemesarial/bastr/blob/v0.1.6/src/commands/toArray.js)_
<!-- commandsstop -->
