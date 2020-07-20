import { tokenize } from '../tokenize'
import Lexer from '../lexer'
import { map } from '../position'
import { inspect } from 'util'

const debug = (text: string) => {
  const { substring } = map(text)
  const { all } = tokenize(text)
  const data = all().map(token => ({
    ...token,
    content: substring(token.position)
  }))

  console.log(inspect(data, false, null, true))
}

describe('Lexer', () => {
  const lexer = new Lexer({ timezone: `Pacific/Auckland` })

  it('works', () => {
    const text = `
* TODO [#A] headline *one* :tag1:tag2:
* DONE headline two
a paragrph.
another line
** level 2 headline

`
    // debug(text)

  })

  it('knows table row', () => {
    expect(lexer.tokenize('| batman | superman | wonder woman |')).toMatchSnapshot()
  })


  it.skip('knows table separators', () => {
    expect(lexer.tokenize('|----+---+----|')).toMatchSnapshot()
    expect(lexer.tokenize('|--=-+---+----|')).toMatchSnapshot()
    expect(lexer.tokenize('  |----+---+----|')).toMatchSnapshot()
    expect(lexer.tokenize('|----+---+----')).toMatchSnapshot()
    expect(lexer.tokenize('|---')).toMatchSnapshot()
    expect(lexer.tokenize('|-')).toMatchSnapshot()
  })

  it.skip('knows these are not table separators', () => {
    expect(lexer.tokenize('----+---+----|')).toMatchSnapshot()
  })

  it.skip('knows table rows', () => {
    expect(lexer.tokenize('| hello | world | y\'all |')).toMatchSnapshot()
    expect(lexer.tokenize('   | hello | world | y\'all |')).toMatchSnapshot()
    expect(lexer.tokenize('|    hello |  world   |y\'all |')).toMatchSnapshot()
    // with empty cell
    expect(lexer.tokenize('||  world   | |')).toMatchSnapshot()
  })

  it.skip('knows these are not table rows', () => {
    expect(lexer.tokenize(' hello | world | y\'all |')).toMatchSnapshot()
    expect(lexer.tokenize('|+')).toMatchSnapshot()
  })

  it.skip('knows these are timestamps', () => {
    expect(lexer.tokenize('<2019-08-19 Mon>')).toMatchSnapshot()
    expect(lexer.tokenize('<2019-08-19 Mon 13:20>')).toMatchSnapshot()
    expect(lexer.tokenize('<2019-08-19 Mon 13:20-14:00>')).toMatchSnapshot()
    expect(lexer.tokenize('<2019-08-19 Mon>--<2019-08-20 Tue>')).toMatchSnapshot()
  })

})
