import { Tag } from 'warp-contracts';
import ids from '../src/game/config/warp-ao-ids.js';

export function mockDataItem(data, owner, processId = ids.processId_dev) {
  const withTags = {
    tags: [
      new Tag('Action', JSON.stringify(data)),
      new Tag('Data-Protocol', 'ao'),
      new Tag('Type', 'Message'),
      new Tag('Variant', 'ao.TN.1'),
      { name: 'SDK', value: 'ao' },
      new Tag('From-Process', processId),
      new Tag('From-Module', ids.moduleId_dev),
      new Tag('Salt', '' + Date.now()),
    ],
    data: '1234',
    target: processId,
  };
  return {
    ...withTags,
    Owner: owner,
    Id: Math.random().toString(36).substring(2),
    Tags: withTags.tags,
    Timestamp: Date.now(),
  };
}

export function dateFromArg(dateStr) {
  if (!dateStr) {
    return null;
  }
  const d = new Date();
  const dateArr = dateStr.split('T');
  if (dateArr.length > 1) {
    dateStr = dateArr[1];
    const dateArgs = dateArr[0].split('-');
    if (dateArgs.length) {
      d.setDate(removeStartCharacter(dateArgs.shift(), '0'));
    }
    if (dateArgs.length) {
      d.setMonth(removeStartCharacter(dateArgs.shift(), '0') - 1);
    }
    if (dateArgs.length) {
      d.setFullYear(removeStartCharacter(dateArgs.shift(), '0'));
    }
  }
  const timeArr = dateStr.split(':');
  d.setHours(12);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  if (timeArr.length) {
    d.setHours(timeArr.shift());
  }
  if (timeArr.length) {
    d.setMinutes(timeArr.shift());
  }
  if (timeArr.length) {
    d.setSeconds(timeArr.shift());
  }
  return d;
}

export function argument(arg) {
  const idx = process.argv.indexOf(`--${arg}`);
  if (idx < 0) {
    return null;
  }
  return process.argv[idx + 1];
}

export function mandatoryArg(arg, comment = '') {
  const mandatory = argument(arg);
  if (!mandatory) {
    throw new Error(`Arg missing: '${arg}'. ${comment}`);
  }
  return mandatory;
}

function removeStartCharacter(word, char) {
  while (word.charAt(0) == char) {
    word = word.substring(1);
  }

  return word;
}
