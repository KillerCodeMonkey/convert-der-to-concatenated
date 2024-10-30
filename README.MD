## ConvertDERToConcatenated

Little NodeJS helper to transform ECDSA ASN1 DER (as base64 string or Buffer) to concatenated R|S representation.

### Install

```SH
npm install convert-der-to-concatenated

yarn add convert-der-to-concatenated
```

### Usage

TS

```TS
import { convertDerToConcatenated } from 'convert-der-to-concatenated'

const asn1 = 'some base64 asn1 der'

// null = nothing found, base64 string of r and s
const rsConcatenated = convertDerToConcatenated(ans1)
```

JS

```JS
const  convertDerToConcatenated = require('convert-der-to-concatenated').convertDerToConcatenated

const asn1 = 'some base64 asn1 der'

// null = nothing found, base64 string of r and s
const rsConcatenated = convertDerToConcatenated(ans1)
```
