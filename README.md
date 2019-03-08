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
$ (someProcess) | bs COMMAND
running command...
$ bs (-v|--version|version)
@cthru/bastr/0.3.3 darwin-x64 node-v10.10.0
$ bs --help [COMMAND]
USAGE
  $ (someProcess) | bs COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`(someProcess) | bs capitalize`](#someprocess--bs-capitalize)
* [`(someProcess) | bs findItem TERM`](#someprocess--bs-finditem-term)
* [`(someProcess) | bs getItem [INDEX]`](#someprocess--bs-getitem-index)
* [`(someProcess) | bs help [COMMAND]`](#someprocess--bs-help-command)
* [`(someProcess) | bs join [GLUE]`](#someprocess--bs-join-glue)
* [`(someProcess) | bs replace SEARCHTERM REPLACETERM`](#someprocess--bs-replace-searchterm-replaceterm)
* [`(someProcess) | bs script [SCRIPTNAME]`](#someprocess--bs-script-scriptname)
* [`bs script:add`](#someprocess--bs-scriptadd)
* [`bs script:delete SCRIPTNAME`](#someprocess--bs-scriptdelete-scriptname)
* [`bs script:list`](#someprocess--bs-scriptlist)
* [`(someProcess) | bs select INDEXES`](#someprocess--bs-select-indexes)
* [`(someProcess) | bs split DELIMITER`](#someprocess--bs-split-delimiter)
* [`(someProcess) | bs toArray`](#someprocess--bs-toarray)
* [`(someProcess) | bs trim TRIMCHAR`](#someprocess--bs-trim-trimchar)

### `(someProcess) | bs capitalize`

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

_See code: [src/commands/capitalize.js](https://github.com/nemesarial/bastr/blob/v0.3.3/src/commands/capitalize.js)_

### `(someProcess) | bs findItem TERM`

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

_See code: [src/commands/findItem.js](https://github.com/nemesarial/bastr/blob/v0.3.3/src/commands/findItem.js)_

### `(someProcess) | bs getItem [INDEX]`

Get an Item from an array, or a character from a string

```
USAGE
  $ (someProcess) | bs getItem [INDEX]

ARGUMENTS
  INDEX  Zero-based index for the array item to select

ALIASES
  $ (someProcess) | bs get
```

_See code: [src/commands/getItem.js](https://github.com/nemesarial/bastr/blob/v0.3.3/src/commands/getItem.js)_

### `(someProcess) | bs help [COMMAND]`

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

### `(someProcess) | bs join [GLUE]`

Join multiple array elements together

```
USAGE
  $ (someProcess) | bs join [GLUE]

ARGUMENTS
  GLUE  [default:  ] Glue to use for join
```

_See code: [src/commands/join.js](https://github.com/nemesarial/bastr/blob/v0.3.3/src/commands/join.js)_

### `(someProcess) | bs replace SEARCHTERM REPLACETERM`

Replaces Values in strings or arrays

```
USAGE
  $ (someProcess) | bs replace SEARCHTERM REPLACETERM

ARGUMENTS
  SEARCHTERM   The term to search for
  REPLACETERM  The term to replace searchTerm with

OPTIONS
  -c, --case-sensitive  match only case sensitive occurances
  -f, --first           only replace the first occurance
  -r, --regex           use regular expression in search term
```

_See code: [src/commands/replace.js](https://github.com/nemesarial/bastr/blob/v0.3.3/src/commands/replace.js)_

### `(someProcess) | bs script [SCRIPTNAME]`

Apply a script to bash output

```
USAGE
  $ (someProcess) | bs script [SCRIPTNAME]

ARGUMENTS
  SCRIPTNAME  The script you want to apply

OPTIONS
  -s, --show-cli-equivalent  Show what this script would look like on bash
```

_See code: [src/commands/script/index.js](https://github.com/nemesarial/bastr/blob/v0.3.3/src/commands/script/index.js)_

### `bs script:add`

Add a new Script

```
USAGE
  $ bs script:add
```

_See code: [src/commands/script/add.js](https://github.com/nemesarial/bastr/blob/v0.3.3/src/commands/script/add.js)_

### `bs script:delete SCRIPTNAME`

Delete a named script

```
USAGE
  $ bs script:delete SCRIPTNAME

ARGUMENTS
  SCRIPTNAME  delete the `scriptName` script
```

_See code: [src/commands/script/delete.js](https://github.com/nemesarial/bastr/blob/v0.3.3/src/commands/script/delete.js)_

### `bs script:list`

List your Scripts

```
USAGE
  $ bs script:list
```

_See code: [src/commands/script/list.js](https://github.com/nemesarial/bastr/blob/v0.3.3/src/commands/script/list.js)_

### `(someProcess) | bs select INDEXES`

Selects array items by index list

```
USAGE
  $ (someProcess) | bs select INDEXES

ARGUMENTS
  INDEXES  A list of indexes delimited by comma. Eg. '1,2,3' and '-3,5,6-'
```

_See code: [src/commands/select.js](https://github.com/nemesarial/bastr/blob/v0.3.3/src/commands/select.js)_

### `(someProcess) | bs split DELIMITER`

Split a string into an array based on a delimiter

```
USAGE
  $ (someProcess) | bs split DELIMITER

ARGUMENTS
  DELIMITER  [default:  ] Delimiter to use as split point

OPTIONS
  -r, --regex  Delimiter is regex
```

_See code: [src/commands/split.js](https://github.com/nemesarial/bastr/blob/v0.3.3/src/commands/split.js)_

### `(someProcess) | bs toArray`

Split multiline string into array of lines

```
USAGE
  $ (someProcess) | bs toArray

ALIASES
  $ (someProcess) | bs lineSplit
  $ (someProcess) | bs line2array
  $ (someProcess) | bs lineArray
```

_See code: [src/commands/toArray.js](https://github.com/nemesarial/bastr/blob/v0.3.3/src/commands/toArray.js)_

### `(someProcess) | bs trim TRIMCHAR`

Trim a string or an array of strings

```
USAGE
  $ (someProcess) | bs trim TRIMCHAR

ARGUMENTS
  TRIMCHAR  [default:  ] The character to trim

OPTIONS
  -s, --sides=left|right|both  [default: both] Configure which side(s) to trim
```

_See code: [src/commands/trim.js](https://github.com/nemesarial/bastr/blob/v0.3.3/src/commands/trim.js)_
<!-- commandsstop -->
