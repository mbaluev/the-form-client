import soft from 'timezone-soft';
import spacetime from 'spacetime';
import allTimezones from '@utils/locale/timeZone/list';
import { ILabelStyle, ITimezone, ITimezoneOption } from '@utils/locale/timeZone/types';

export const getOptions = (labelStyle: ILabelStyle) => {
  const options = Object.entries(allTimezones).reduce<ITimezoneOption[]>((selectOptions, zone) => {
    const now = spacetime.now(zone[0]);
    const tz = now.timezone();
    const tzStrings = soft(zone[0]);

    let label = '';
    const abbr = now.isDST()
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tzStrings[0].daylight?.abbr
      : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tzStrings[0].standard?.abbr;
    const altName = now.isDST() ? tzStrings[0].daylight?.name : tzStrings[0].standard?.name;

    const min = tz.current.offset * 60;
    const hhString = String((min / 60) ^ 0);
    const sign = hhString.includes('-') ? '-' : '+';
    const hhStr = hhString.replace('-', '');
    const hh = hhStr.length == 2 ? hhStr : `0${hhStr}`;
    const mm = min % 60 === 0 ? '00' : Math.abs(min % 60);
    const hr = `${hh}:${mm}`;
    const prefix = `(UTC${sign}${hr}) ${zone[1]}`;

    switch (labelStyle) {
      case 'original':
        label = prefix;
        break;
      case 'altName':
        label = altName?.length ? `${prefix} (${altName})` : prefix;
        break;
      case 'abbrev':
        label = abbr?.length < 5 ? `${prefix} (${abbr})` : prefix;
        break;
      default:
        label = `${prefix}`;
    }

    selectOptions.push({
      value: tz.name,
      label: label,
      offset: tz.current.offset,
      abbrev: abbr,
      altName: altName,
    });

    return selectOptions;
  }, []);
  options.sort((a: ITimezoneOption, b: ITimezoneOption) => a.offset - b.offset);
  return options;
};

const findFuzzyTz = (zone: string, labelStyle: ILabelStyle): ITimezoneOption => {
  let currentTime = spacetime.now('GMT');
  try {
    currentTime = spacetime.now(zone);
  } catch (err) {}
  return getOptions(labelStyle)
    .filter((tz: ITimezoneOption) => tz.offset === currentTime.timezone().current.offset)
    .map((tz: ITimezoneOption) => {
      let score = 0;
      if (
        currentTime.timezones[tz.value.toLowerCase()] &&
        !!currentTime.timezones[tz.value.toLowerCase()].dst === currentTime.timezone().hasDst
      ) {
        if (
          tz.value
            .toLowerCase()
            .indexOf(currentTime.tz.substring(currentTime.tz.indexOf('/') + 1)) !== -1
        ) {
          score += 8;
        }
        if (
          tz.label
            .toLowerCase()
            .indexOf(currentTime.tz.substring(currentTime.tz.indexOf('/') + 1)) !== -1
        ) {
          score += 4;
        }
        if (
          tz.value.toLowerCase().indexOf(currentTime.tz.substring(0, currentTime.tz.indexOf('/')))
        ) {
          score += 2;
        }
        score += 1;
      } else if (tz.value === 'GMT') {
        score += 1;
      }
      return { tz, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(({ tz }) => tz)[0];
};

export const parseTimezone = (zone: ITimezone, labelStyle: ILabelStyle) => {
  if (typeof zone === 'object' && zone.value && zone.label) return zone;
  if (typeof zone === 'string') {
    const retZone = getOptions(labelStyle).find((tz) => tz.value === zone);
    if (retZone) {
      return retZone;
    } else if (zone.indexOf('/') !== -1) {
      return findFuzzyTz(zone, labelStyle);
    }
  } else if (zone.value && !zone.label) {
    return getOptions(labelStyle).find((tz) => tz.value === zone.value);
  }
};
