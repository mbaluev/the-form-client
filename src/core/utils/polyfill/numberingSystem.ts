// © 2020 Google, Ecma International
// Polyfill Intl.getSupportedNumberingSystems

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (Intl.getSupportedNumberingSystems == undefined) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Intl.getSupportedNumberingSystems = function () {
    const NUMBERING_SYSTEMS_IN_CLDR = [
      // Generated by
      // file="https://raw.githubusercontent.com/unicode-org/cldr/master/common/supplemental/numberingSystems.xml"
      // curl $file 2> /dev/null |egrep " id=" | cut -d '"' -f2| \
      //    sed 's/.*/"&",/'|tr '\n' ' '
      'adlm',
      'ahom',
      'arab',
      'arabext',
      'armn',
      'armnlow',
      'bali',
      'beng',
      'bhks',
      'brah',
      'cakm',
      'cham',
      'cyrl',
      'deva',
      'diak',
      'ethi',
      'fullwide',
      'geor',
      'gong',
      'gonm',
      'grek',
      'greklow',
      'gujr',
      'guru',
      'hanidays',
      'hanidec',
      'hans',
      'hansfin',
      'hant',
      'hantfin',
      'hebr',
      'hmng',
      'hmnp',
      'java',
      'jpan',
      'jpanfin',
      'jpanyear',
      'kali',
      'khmr',
      'knda',
      'lana',
      'lanatham',
      'laoo',
      'latn',
      'lepc',
      'limb',
      'mathbold',
      'mathdbl',
      'mathmono',
      'mathsanb',
      'mathsans',
      'mlym',
      'modi',
      'mong',
      'mroo',
      'mtei',
      'mymr',
      'mymrshan',
      'mymrtlng',
      'newa',
      'nkoo',
      'olck',
      'orya',
      'osma',
      'rohg',
      'roman',
      'romanlow',
      'saur',
      'segment',
      'shrd',
      'sind',
      'sinh',
      'sora',
      'sund',
      'takr',
      'talu',
      'taml',
      'tamldec',
      'telu',
      'thai',
      'tibt',
      'tirh',
      'vaii',
      'wara',
      'wcho',
    ];

    const isSupported = function (item: string) {
      try {
        // Firefox not yet support numberingSystem option
        const nf = new Intl.NumberFormat('en-u-nu-' + item);
        const o = nf.resolvedOptions().numberingSystem;
        if (o == item && (item == 'latn' || nf.format(123) != '123')) {
          return true;
        }
        console.log(item + ' is accepted but changed to ' + o);
      } catch (e) {
        console.log(item + ' is not supported');
      }
      return false;
    };

    const r: string[] = [];
    NUMBERING_SYSTEMS_IN_CLDR.forEach(function (numberingSystem) {
      if (isSupported(numberingSystem)) r.push(numberingSystem);
    });
    return r;
  };
}
