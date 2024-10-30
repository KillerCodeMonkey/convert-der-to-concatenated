export const convertDerToConcatenated = (signature: string | Buffer) => {
  const derEncodedBytes = typeof signature === 'string' ? Buffer.from(signature, 'base64') : signature

  if (derEncodedBytes.length < 8 || derEncodedBytes[0] != 48) {
    return null
  }

  let offset = 0
  if (derEncodedBytes[1] > 0) {
    offset = 2
  }
  else if (derEncodedBytes[1] == 0x81) {
    offset = 3
  }
  else {
    return null
  }

  const rLength = derEncodedBytes[offset + 1]
  let i = rLength
  for (i; (i > 0) && (derEncodedBytes[(offset + 2 + rLength) - i] == 0); i--);

  const sLength = derEncodedBytes[offset + 2 + rLength + 1]

  let j = sLength
  for (j; (j > 0) && (derEncodedBytes[(offset + 2 + rLength + 2 + sLength) - j] == 0); j--);

  if ((derEncodedBytes[offset - 1] & 0xff) != derEncodedBytes.length - offset
    || (derEncodedBytes[offset - 1] & 0xff) != 2 + rLength + 2 + sLength
    || derEncodedBytes[offset] != 2
    || derEncodedBytes[offset + 2 + rLength] != 2) {
    return null
  }

  return Buffer.concat([derEncodedBytes.subarray((offset + 2 + rLength) - i, (offset + 2 + rLength)), derEncodedBytes.subarray((offset + 2 + rLength + 2 + sLength) - j, (offset + 2 + rLength + 2 + sLength))]).toString('base64')
}
