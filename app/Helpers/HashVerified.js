const Validator = use('Validator')
const Hash = use('Hash')

const hashVerified = async (data, field, message, args, get) => {
  const value = get(data, field)
  if (!value) {
    return
  }

  const [ hashedValue ] = args
  const verified = await Hash.verify(value, hashedValue)

  if (!verified) {
    throw message
  }
}

Validator.extend('hashVerified', hashVerified)
