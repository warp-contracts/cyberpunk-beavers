import {
  LoggerFactory,
  QuickJsPluginInput,
  QuickJsPluginMessage,
} from 'warp-contracts';
import fs from 'fs';
import { expect, test, describe, beforeAll } from 'vitest';
import {QuickJsPlugin, QuickJsHandlerApi} from "warp-contracts-plugin-quickjs";

describe('Game test', () => {
  let contractSource: string;
  let quickJSPlugin: QuickJsPlugin<unknown>;
  let message, messageRandom1, messageRandom2: QuickJsPluginMessage;
  let quickJs: QuickJsHandlerApi<unknown>;
  const initState = {
    counter: 0
  }

  beforeAll(async () => {
    LoggerFactory.INST.logLevel('error');

    contractSource = fs.readFileSync('dist/output.js', 'utf-8');
    quickJSPlugin = new QuickJsPlugin({});

    message = {
      Cron: false,
      Data: 'Hello ao',
      Epoch: 0,
      From: 'jliaItK34geaPuyOYVqh8fsRgXIXWwa9iLJszGXKOHE',
      Id: '1Jy99GiGQryL9MzdgYe4KyQ5UmdRWTMJfGXc7vxEZ-0',
      Nonce: 1,
      Owner: 'jnioZFibZSCcV8o-HkBXYPYEYNib4tqfexP0kCBXX_M',
      Signature:
        'ClPGScgzfNjKUpBM8BxIr2MPlGsVtHMxxQBvs7k9nRAzUlnTQmkcqSmDJk1GA0iQcDHD3-DWXIkWYXUuPwWqYKQOletl5n4FdOTg6xWeXqYd-mpeHPPzpaadhsWs_XCzEt6QSAaRVg1HR79fhIJxCzbWAftwCSMzI-pzQ6HAgCjyy-QFIPthd8UGShnBg0qEmBIvZTOhUK6f6S7cDbphWnb_vLmatNTSAp3iDdTbIewjwFytmFonDn_Er0GYlJ1jGVWfBfjORtPNPsQR-yBqN54HUPTnJ86YzGI3uFTl43Y5E0bGpwLgH78Sz1Db8bziAduXLSVcaPhrYDAmTa7VyiCjAOM3Z1I3ih_BSPUph4GE5BV0JSfSWGvf5Sh2-5E5vkiXjytcY82BGMqbFza6Q1A-ak_btT80eDDbbRdjGjZbulAhHJNYP0DLI-WT0pbxMeOIcMbnVWDbpNvjyM94oQw6IOh706U7rKlf5hz4aadzr9vi1jbSVRJS3Gs58533ax2r-EV1b_22KIgR_aGZcMfIyRuYCE3mUvKOuTjOaN8HmjUnX6YRjJxMWt12QWbTILcyDc_r9Eu3h3z_wZAD3dPAiSu74TS5ErZ_Eyfb3DN32wT-KqQIFS0bzXICi-e4hC-G_v_KPLLeX6sP_kB1n141iGgUj0kyunh2_Mnfs_4',
      Tags: [
        {name: 'type', value: 'Message'},
        {name: 'variant', value: 'ao.TN.1'},
        {name: 'Data-Protocol', value : 'ao'},
        {name: 'From-Module', value: 'PR72afhcby-x9c9Jg--utxw9L8_ZCOyjCgnUhp2JSMA'},
        {name: 'From-Process', value: 'jliaItK34geaPuyOYVqh8fsRgXIXWwa9iLJszGXKOHE'},
        {name: 'Action', value: JSON.stringify({cmd: 'increment'})}
      ],
      Target: '',
      Timestamp: '1708592722',
      'Block-Height': '1369091',
      'Forwarded-By': 'z1pq2WzmaYnfDwvEFgUZBj48anUsxxN64ZjbWOsIn08',
      'Hash-Chain': 'hJ0B-0yxKxeL3IIfaIIF7Yr6bFLG2vQayaF8G0EpjbY'
    };

    messageRandom1 = {
      ...message,
      Tags: {
        type: 'Message',
        variant: 'ao.TN.1',
        'Data-Protocol': 'ao',
        'From-Module': 'PR72afhcby-x9c9Jg--utxw9L8_ZCOyjCgnUhp2JSMA',
        'From-Process': 'jliaItK34geaPuyOYVqh8fsRgXIXWwa9iLJszGXKOHE',
        Action: 'random'
      },
    }
    messageRandom2 = {
      ...messageRandom1,
      Signature: 'xxx'
    }

    quickJs = await quickJSPlugin.process({
      contractSource,
      binaryType: "release_sync"
    } as QuickJsPluginInput);
  });

  test('should correctly handle "increment" message', async () => {

    // INCREMENT
    const result = await quickJs.handle(message, initState);
    console.log(result);
    expect(result.State.counter).toEqual(1);
    const result2 = await quickJs.handle(message, result.State);
    expect(result2.State.counter).toEqual(2);
    console.log('Increment result', result2.Output)
    console.log('------------------------------')

    // REGISTER
    message.Tags.Action = JSON.stringify({cmd: 'register', beaverId: 2});
    const result3 = await quickJs.handle(message, result2.State);
    console.log('Register Result', result3.Output)

    // MOVE
    message.Tags.Action = JSON.stringify({cmd: 'move', dir: 'right'});
    const result4 = await quickJs.handle(message, result3.State)
    console.log('Move result', result4.Output);

    // JOIN
    message.Tags.Action = JSON.stringify({cmd: 'join'});
    const result5 = await quickJs.handle(message, result4.State)
    console.log('Move result', result5.Output);

    // MOVE
    message.Tags.Action = JSON.stringify({cmd: 'move', dir: 'down'});
    const result6 = await quickJs.handle(message, result5.State)
    console.log('Move result', result6.Output);
  });



});
