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
  const timeArr = dateStr.split(':');
  const d = new Date();
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
