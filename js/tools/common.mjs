import { Tag } from 'warp-contracts';
import ids from '../config/warp-ao-ids.js';


export function mockDataItem(data, owner) {
  const withTags = {
    tags: [
      new Tag('Action', JSON.stringify(data)),
      new Tag('Data-Protocol', 'ao'),
      new Tag('Type', 'Message'),
      new Tag('Variant', 'ao.TN.1'),
      { name: 'SDK', value: 'ao' },
      new Tag('From-Process', ids.processId_dev),
      new Tag('From-Module', ids.moduleId_dev),
      new Tag('Salt', '' + Date.now()),
    ],
    data: '1234',
    target: ids.processId_dev,
  };
  return {
    ...withTags,
    Owner: owner,
    Id: Math.random().toString(36).substring(2),
    Tags: withTags.tags,
    Timestamp: Date.now(),
  };
}
