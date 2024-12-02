import { Send } from './aos.helper.js';
import { describe, test, expect } from 'vitest';
import fs from 'fs';

global.ao = {};
ao.send = function (di) {
  console.log(`got me some data`, di);
  ao.di = di;
};

describe('HollowTestJs', () => {
  test('Eval hollow contract', async () => {
    const dbCode = fs.readFileSync('./lua/hollow/hollow-db.lua', 'utf-8');
    await Send({ Action: 'Eval', Data: dbCode });
    const utilsCode = fs.readFileSync('./lua/hollow/hollow-utils.lua', 'utf-8');
    await Send({ Action: 'Eval', Data: utilsCode });
    const code = fs.readFileSync('./lua/hollow/hollow.lua', 'utf-8');
    const result = await Send({ Action: 'Eval', Data: code });

    expect(result.Output.data).eq('');
    expect(result.Messages).toEqual([]);
  });

  test('Add item', async () => {
    expect((await Send(addSingleItem('hp', '5', '100'))).Output.data).not.toContain('Error');
    expect((await Send(addSingleItem('ap', '10', '200'))).Output.data).not.toContain('Error');
  });

  test('Add item - unathorized', async () => {
    const action = addSingleItem('hp', '5', '100');
    action.Owner = 'DIFFERENT_OWNER';
    action.From = 'DIFFERENT_OWNER';
    expect((await Send(action)).Messages[0].Tags.find((m) => m.name == 'Status')?.value).toEqual('Error');
  });

  test(`Change item's price`, async () => {
    expect((await Send(addSingleItem('hp', '0', '500'))).Output.data).not.toContain('Error');
  });

  test(`Read item's info`, async () => {
    const result = await Send({ Action: 'Read-Item', Item: 'hp' });
    const item = JSON.parse(result.Messages[0].Data);
    const result2 = await Send({ Action: 'Read-Item', Item: 'ap' });
    const item2 = JSON.parse(result2.Messages[0].Data);
    expect(item.Price).toBe('500');
    expect(item.Quantity).toBe('5');
    expect(item2.Price).toBe('200');
    expect(item2.Quantity).toBe('10');
  });

  test(`Read item - not existing`, async () => {
    expect(
      (await Send({ Action: 'Read-Item', Item: 'random' })).Messages[0].Tags.find((t) => t.name == 'Status')?.value
    ).toEqual('Error');
  });

  test(`Create order for item`, async () => {
    expect((await Send(createSingleOrder('1000', '2', 'hp'))).Output.data).not.toContain('Error');
  });

  test('Create order - unathorized', async () => {
    const action = createSingleOrder('1000', '2', 'hp');
    action.Owner = 'DIFFERENT_OWNER';
    action.From = 'DIFFERENT_OWNER';
    const result = await Send(action);
    const message = findMessageBasedOnTag(result, 'Action', 'Create-Order-Error');
    const transferMessage = findMessageBasedOnTag(result, 'Action', 'Transfer');
    expect(getTagValue(message.Tags, 'Status')).toEqual('Error');
    expect(getTagValue(transferMessage.Tags, 'Quantity')).toEqual('1000');
  });

  test(`Create order - item not in the hollow`, async () => {
    const result = await Send(createSingleOrder('1000', '2', 'random'));
    const message = findMessageBasedOnTag(result, 'Action', 'Create-Order-Error');
    const transferMessage = findMessageBasedOnTag(result, 'Action', 'Transfer');
    expect(getTagValue(message.Tags, 'Status')).toEqual('Error');
    expect(getTagValue(transferMessage.Tags, 'Quantity')).toEqual('1000');
  });

  test(`Create order - not enough items in the hollow`, async () => {
    const result = await Send(createSingleOrder('1000', '10', 'hp'));
    const message = findMessageBasedOnTag(result, 'Action', 'Create-Order-Error');
    const transferMessage = findMessageBasedOnTag(result, 'Action', 'Transfer');
    expect(getTagValue(message.Tags, 'Status')).toEqual('Error');
    expect(getTagValue(transferMessage.Tags, 'Quantity')).toEqual('1000');
  });

  test(`Create order - not enough tokens for an item`, async () => {
    const result = await Send(createSingleOrder('1000', '3', 'hp'));
    const message = findMessageBasedOnTag(result, 'Action', 'Create-Order-Error');
    const transferMessage = findMessageBasedOnTag(result, 'Action', 'Transfer');
    expect(getTagValue(message.Tags, 'Status')).toEqual('Error');
    expect(getTagValue(transferMessage.Tags, 'Quantity')).toEqual('1000');
  });

  test(`Create order - should transfer remaining quantity if it's too much`, async () => {
    const result = await Send(createSingleOrder('500', '2', 'ap'));
    console.dir(result);
    const transferMessage = findMessageBasedOnTag(result, 'Action', 'Transfer');
    expect(getTagValue(transferMessage.Tags, 'Quantity')).toEqual('100');
  });

  test(`Read balance`, async () => {
    const result = await Send({
      Action: 'Read-Balance',
      ['Wallet-Address']: 'jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE',
    });
    const balance = JSON.parse(result.Messages[0].Data);
    expect(balance.ap).toEqual('2');
    expect(balance.hp).toEqual('2');
  });

  test(`Read hollow`, async () => {
    const result = JSON.parse(
      (
        await Send({
          Action: 'Read-Hollow',
        })
      ).Messages[0].Data
    );
    expect(result['ap'].Price).toBe('200');
    expect(result['hp'].Price).toBe('500');
    expect(result['ap'].Quantity).toBe('8');
    expect(result['hp'].Quantity).toBe('3');
  });

  test(`Read orders`, async () => {
    const result = JSON.parse(
      (
        await Send({
          Action: 'Read-Orders',
        })
      ).Messages[0].Data
    );
    expect(result.length).toBe(2);
  });

  test(`Read orders - specific address`, async () => {
    const result = JSON.parse(
      (
        await Send({
          Action: 'Read-Orders',
          ['Wallet-Address']: '123',
        })
      ).Messages[0].Data
    );
    expect(result.length).toBe(0);
  });
});

function addSingleItem(type, qty, price) {
  return {
    Action: 'Add-Item',
    Item: type,
    Quantity: qty,
    Price: price,
  };
}

function createSingleOrder(qty, itemQty, item) {
  return {
    ['Action']: 'Credit-Notice',
    ['X-Order-Action']: 'Create-Order',
    Sender: 'jmGGoJaDYDTx4OCM7MP-7l-VLIM4ZEGCS0cHPsSmiNE',
    Quantity: qty,
    ['Item-Quantity']: itemQty,
    Item: item,
  };
}

function findMessageBasedOnTag(result, name, value) {
  return result.Messages.find((m) => m.Tags.find((t) => t.name == name && t.value == value));
}

function getTagValue(tags, name) {
  return tags.find((m) => m.name == name)?.value;
}
