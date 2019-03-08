bastr
=====

CLI string manipulation utility

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@cthru/bastr.svg)](https://npmjs.org/package/@cthru/bastr)
[![Downloads/week](https://img.shields.io/npm/dw/@cthru/bastr.svg)](https://npmjs.org/package/@cthru/bastr)
[![License](https://img.shields.io/npm/l/@cthru/bastr.svg)](https://github.com/nemesarial/bastr/blob/master/package.json)

# Description
`bastr` takes `stdin` content and provide functions to modify the content. It is
meant as an alternative to using `sed`, `tr`, `awk` and other utilities for
simple string and array manipulation.

The unix utilities are probably more performant and more powerful - this utility
only exists because it is easier and more semantic to use.

## Advanced Use: Scripts
Scripts in `bastr` are sequences of predefined actions. To create a new script,
use the `bs script:add` command and follow along with the prompts

To list your scripts, use `bs script:list`.

To apply a script, use `(someprocess) | bs script [scriptname]`

## Examples

```sh-session
$ echo -n "capitalize all words" | bs split " " | bs capitalize | bs join " "
>>> Capitalize All Words
```
```sh-session
$ ps | bs lineArray | bs findItem bash | bs getItem 0 | bs split -r "\s+" | bs getItem 3
>>> /usr/local/bin/bash
```


<!-- toc -->
* [Description](#description)
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
@cthru/bastr/0.2.4 darwin-x64 node-v10.10.0
$ bs --help [COMMAND]
USAGE
  $ bs COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bs capitalize`](#bs-capitalize)
* [`bs findItem TERM`](#bs-finditem-term)
* [`bs getItem [INDEX]`](#bs-getitem-index)
* [`bs help [COMMAND]`](#bs-help-command)
* [`bs join [GLUE]`](#bs-join-glue)
* [`bs replace SEARCHTERM REPLACETERM`](#bs-replace-searchterm-replaceterm)
* [`bs script [SCRIPTNAME]`](#bs-script-scriptname)
* [`bs script:add`](#bs-scriptadd)
* [`bs script:list`](#bs-scriptlist)
* [`bs split DELIMITER`](#bs-split-delimiter)
* [`bs toArray`](#bs-toarray)

## `bs capitalize`

Capitalizes string or [string]

```
USAGE
  $ bs capitalize

OPTIONS
  -a, --all           Target all letters, not just first
  -d, --decapitalize  De-Capitalize instead

ALIASES
  $ bs cap
```

_See code: [src/commands/capitalize.js](https://github.com/nemesarial/bastr/blob/v0.2.4/src/commands/capitalize.js)_

## `bs findItem TERM`

Get an Item from an array, or a character from a string

```
USAGE
  $ bs findItem TERM

ARGUMENTS
  TERM  The term to search for

ALIASES
  $ bs search
  $ bs filter
  $ bs find
```

_See code: [src/commands/findItem.js](https://github.com/nemesarial/bastr/blob/v0.2.4/src/commands/findItem.js)_

## `bs getItem [INDEX]`

Get an Item from an array, or a character from a string

```
USAGE
  $ bs getItem [INDEX]

ARGUMENTS
  INDEX  Zero-based index for the array item to select

ALIASES
  $ bs get
  $ bs select
```

_See code: [src/commands/getItem.js](https://github.com/nemesarial/bastr/blob/v0.2.4/src/commands/getItem.js)_

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

## `bs join [GLUE]`

Join multiple array elements together

```
USAGE
  $ bs join [GLUE]

ARGUMENTS
  GLUE  [default:  ] Glue to use for join
```

_See code: [src/commands/join.js](https://github.com/nemesarial/bastr/blob/v0.2.4/src/commands/join.js)_

## `bs replace SEARCHTERM REPLACETERM`

Replaces Values in strings or arrays

```
USAGE
  $ bs replace SEARCHTERM REPLACETERM

ARGUMENTS
  SEARCHTERM   The term to search for
  REPLACETERM  The term to replace searchTerm with

OPTIONS
  -c, --case-sensitive  match only case sensitive occurances
  -f, --first           only replace the first occurance
  -r, --regex           use regular expression in search term
```

_See code: [src/commands/replace.js](https://github.com/nemesarial/bastr/blob/v0.2.4/src/commands/replace.js)_

## `bs script [SCRIPTNAME]`

Use a Script

```
USAGE
  $ bs script [SCRIPTNAME]

ARGUMENTS
  SCRIPTNAME  The script you want to apply

OPTIONS
  -s, --show-cli-equivalent  Show what this script would look like on bash
```

_See code: [src/commands/script/index.js](https://github.com/nemesarial/bastr/blob/v0.2.4/src/commands/script/index.js)_

## `bs script:add`

List and use Scripts

```
USAGE
  $ bs script:add
```

_See code: [src/commands/script/add.js](https://github.com/nemesarial/bastr/blob/v0.2.4/src/commands/script/add.js)_

## `bs script:list`

List your Scripts

```
USAGE
  $ bs script:list
```

_See code: [src/commands/script/list.js](https://github.com/nemesarial/bastr/blob/v0.2.4/src/commands/script/list.js)_

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

_See code: [src/commands/split.js](https://github.com/nemesarial/bastr/blob/v0.2.4/src/commands/split.js)_

## `bs toArray`

Split multiline string into array of lines

```
USAGE
  $ bs toArray

ALIASES
  $ bs lineSplit
  $ bs line2array
  $ bs lineArray
```

_See code: [src/commands/toArray.js](https://github.com/nemesarial/bastr/blob/v0.2.4/src/commands/toArray.js)_
<!-- commandsstop -->
