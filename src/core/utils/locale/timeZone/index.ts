import '@utils/polyfill/timeZones';
import { getOptions, parseTimezone } from '@utils/locale/timeZone/functions';

const labelStyle = 'altName';
const name = (timeZone?: string | null) => {
  return getOptions(labelStyle).find((d) => d.value === timeZone)?.label;
};

const timeZones = {
  default:
    parseTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone, labelStyle)
      ?.value || Intl.DateTimeFormat().resolvedOptions().timeZone,
  items: getOptions(labelStyle),
  name,
};

export default timeZones;
