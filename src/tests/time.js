/* eslint-env jest */
import { formatUptime } from 'src/lib/utils/time'

describe('time', () => {
  describe('formatUptime', () => {
    it('is a function', () => expect(formatUptime).toMatchSnapshot())
    it('3 seconds', () => expect(formatUptime(3)).toMatchSnapshot())
    it('23 minutes', () => expect(formatUptime(1380)).toMatchSnapshot())
    it('29 minutes', () => expect(formatUptime(1740)).toMatchSnapshot())
    it('30 minutes', () => expect(formatUptime(1800)).toMatchSnapshot())
    it('31 minutes', () => expect(formatUptime(1860)).toMatchSnapshot())
    it('3 hours 48 minutes', () =>
      expect(formatUptime(13680)).toMatchSnapshot())
    it('4 hours', () => expect(formatUptime(14400)).toMatchSnapshot())
    it('23 hours', () => expect(formatUptime(82800)).toMatchSnapshot())
    it('23 hours 17 minutes', () =>
      expect(formatUptime(83820)).toMatchSnapshot())
    it('23 hours 49 minutes', () =>
      expect(formatUptime(85740)).toMatchSnapshot())
    it('1 day 4 hours', () => expect(formatUptime(100800)).toMatchSnapshot())
    it('3 days', () => expect(formatUptime(259200)).toMatchSnapshot())
    it('3 days 8 minutes', () => expect(formatUptime(259680)).toMatchSnapshot())
  })
})
