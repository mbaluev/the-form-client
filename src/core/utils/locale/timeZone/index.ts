import '@utils/polyfill/timeZones';
import { getOptions, parseTimezone } from '@utils/locale/timeZone/functions';

const labelStyle = 'altName';

const timeZones = {
  labelStyle,
  default:
    parseTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone, labelStyle)?.value ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  selectItems: getOptions(labelStyle),
};

export default timeZones;
