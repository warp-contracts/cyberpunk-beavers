


--- Overall

------- Actual players and their temp wallets
with wallet_mapping as (
    select distinct key as temp_wallet, value as owner
    from results, jsonb_each(result -> 'State' -> 'generatedWalletsMapping')
    where timestamp >= '2024-07-16 14:00:00 +00:00' and timestamp <= '2024-07-16 15:00:00 +00:00'
      and process_id <> 'p-4NGGl79EX_xwanjJJyjkSyOUknyJbhj61TAwj9nsQ'
      and process_id <> 'iSxR0exVxlpL26emdzNAa5YLvuL5aqDJX8tz5QiESS4')
select count(distinct owner) as "Actual Players"
from wallet_mapping;
---------------------------------------------------------------------------------------------------------------------


with message as (
    select
                    message_data -> 'message' -> 'owner' ->> 'address' as owner,
                    message_id,
                    process_id,
                    timestamp,
                    message_data -> 'message' -> 'tags' as tags,
                    (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Action")') -> 0 ->> 'value') as value,
                    (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Recipient")') -> 0 ->> 'value') as recipient,
                    (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Quantity")') -> 0 ->> 'value') as qty,
                    (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Action")') -> 0 ->> 'value') = any(ARRAY['Debit', 'Debit-Notice']) as weird
    from messages
    where timestamp >= 1721138400000 and timestamp <= 1721142000000
      and process_id <> 'iSxR0exVxlpL26emdzNAa5YLvuL5aqDJX8tz5QiESS4'
      and process_id <> 'p-4NGGl79EX_xwanjJJyjkSyOUknyJbhj61TAwj9nsQ'
)
select count(distinct owner) as "Visitors",
       count(distinct process_id) as "Games and chat processes",
       count(distinct message_id) as "Messages"
from message;
---------------------------------------------------------------------------------------------------------------------



------- Favorite Beavers
with message as (
    select
        timestamp,
        message_data -> 'message' -> 'tags' as tags,
        (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Action")') -> 0 ->> 'value') as value,
        (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Action")') -> 0 ->> 'value') = any(ARRAY['Debit', 'Debit-Notice']) as weird
    from messages
    where timestamp >= 1721138400000 and timestamp <= 1721142000000
      and process_id <> 'iSxR0exVxlpL26emdzNAa5YLvuL5aqDJX8tz5QiESS4'
      and process_id <> 'p-4NGGl79EX_xwanjJJyjkSyOUknyJbhj61TAwj9nsQ'
)
--    select * from message;
   , action as (
    select
        timestamp,
        case when weird then value else value::jsonb ->> 'cmd' end as cmd,
        value
    from message
    where not weird and value <> 'Store-Price-Packages'
)
-- select * from action;
select value::jsonb ->> 'beaverId', count(*)
from action
where cmd = 'register'
group by value::jsonb ->> 'beaverId'
order by 2 desc;
---------------------------------------------------------------------------------------------------------------------



------- Tokens transferred
-- This one has been calculated three different ways...
-- 1. When there were valid debit notes
with message as (
    select
        message_id,
        timestamp,
        message_data -> 'message' -> 'tags' as tags,
        (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Action")') -> 0 ->> 'value') as value,
        (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Recipient")') -> 0 ->> 'value') as recipient,
        (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Quantity")') -> 0 ->> 'value') as qty,
        (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Action")') -> 0 ->> 'value') = any(ARRAY['Debit', 'Debit-Notice']) as weird
    from messages
    where timestamp >= 1719496800000 and timestamp <= 1719504000000
)
   , action as (
    select
        message_id,
        timestamp,
        recipient,
        qty::numeric,
        case when weird then value else value::jsonb ->> 'cmd' end as cmd,
        value
    from message
)
select recipient, sum(qty)
from action
where cmd = ANY(ARRAY['Debit-Notice'])
group by recipient order by 2 desc;


-- 2. When transfers ended up on some completely random wallets, heh...
with message as (
    select
        message_id,
        timestamp,
        message_data -> 'message' -> 'tags' as tags,
        (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Action")') -> 0 ->> 'value') as value,
        (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Recipient")') -> 0 ->> 'value') as recipient,
        (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Quantity")') -> 0 ->> 'value') as qty,
        (jsonb_path_query_array(message_data, '$.message.tags[*] ? (@.name == "Action")') -> 0 ->> 'value') = any(ARRAY['Debit', 'Debit-Notice']) as weird
    from su.messages
    --     where timestamp >= 1719496800000 and timestamp <= 1719504000000
--         where timestamp >= 1720099800000 and timestamp <= 1720102980000
    where timestamp >= 1721138400000 and timestamp <= 1721142000000
      and process_id <> 'iSxR0exVxlpL26emdzNAa5YLvuL5aqDJX8tz5QiESS4'
      and process_id <> 'p-4NGGl79EX_xwanjJJyjkSyOUknyJbhj61TAwj9nsQ'
)
        , action as (
    select
        message_id,
        timestamp,
        recipient,
        qty::numeric,
        case when weird then value else value::jsonb ->> 'cmd' end as cmd,
        value
    from message
),
     wallet_mapping as (
         select distinct key as temp_wallet, value ->> 0 as owner
         from results20240705, jsonb_each(result -> 'State' -> 'generatedWalletsMapping')
         where timestamp >= '2024-07-16 14:00:00 +00:00' and timestamp <= '2024-07-16 15:00:00 +00:00'
           and process_id <> 'p-4NGGl79EX_xwanjJJyjkSyOUknyJbhj61TAwj9nsQ'
           and process_id <> 'iSxR0exVxlpL26emdzNAa5YLvuL5aqDJX8tz5QiESS4')
select owner,
       sum(qty),
       string_agg(recipient, ',')
-- select sum(qty)
from action
         join wallet_mapping on action.recipient = wallet_mapping.temp_wallet
where cmd = ANY(ARRAY['Debit-Notice'])
group by owner order by 2 desc;

-- 3. Based on contract state, because debit notes were having a break
with output as (
    select
        timestamp,
        process_id,
        result -> 'Output' ->> 'cmd' as cmd,
        result -> 'Output' as val
    from results
),
     last_stats as (
         select distinct on (process_id) process_id, val
         from output
         where true
           and cmd = 'stats'
           and timestamp >= '2024-07-16 14:00:00 +00:00' and timestamp <= '2024-07-16 15:00:00 +00:00'
         order by process_id, timestamp desc
     ),
     transferred as (
         select key as wallet,
                sum((value -> 'stats' -> 'coins' ->> 'transferred')::numeric) as token
         from last_stats, jsonb_each(val -> 'players')
         group by key
     )
select wallet, token
from transferred
order by token desc;
---------------------------------------------------------------------------------------------------------------------



------- Token Diggers
with output as (
    select
        timestamp,
        process_id,
        result -> 'Output' ->> 'cmd' as cmd,
        result -> 'Output' -> 'digged' as digged,
        result -> 'Output' as val
    from results
)
select
            val -> 'player' ->> 'walletAddress',
            count(*)
from output
where digged ->> 'type' = 'treasure'
  and timestamp >= '2024-07-16 14:00:00 +00:00' and timestamp <= '2024-07-16 15:00:00 +00:00'
  and process_id <> 'p-4NGGl79EX_xwanjJJyjkSyOUknyJbhj61TAwj9nsQ'
  and process_id <> 'iSxR0exVxlpL26emdzNAa5YLvuL5aqDJX8tz5QiESS4' -- oracle contract
group by 1
order by 2 desc;
---------------------------------------------------------------------------------------------------------------------


------- Frags - most kills
with output as (
    select
        timestamp,
        process_id,
        result -> 'Output' ->> 'cmd' as cmd,
        result -> 'Output' as val
    from results
)
select
            val -> 'player' ->> 'walletAddress',
            count(*)
from output
where cmd = 'attacked' and (val ->> 'opponentFinished')::bool
  and timestamp >= '2024-07-16 14:00:00 +00:00' and timestamp <= '2024-07-16 15:00:00 +00:00'
  and process_id <> 'p-4NGGl79EX_xwanjJJyjkSyOUknyJbhj61TAwj9nsQ'
  and process_id <> 'iSxR0exVxlpL26emdzNAa5YLvuL5aqDJX8tz5QiESS4'  -- oracle contract
group by val -> 'player' ->> 'walletAddress'
order by 2 desc;
---------------------------------------------------------------------------------------------------------------------



------- Cannon fodder
with output as (
    select
        timestamp,
        process_id,
        result -> 'Output' ->> 'cmd' as cmd,
        result -> 'Output' as val
    from results
)
select
            val -> 'opponent' ->> 'walletAddress',
            count(*)
from output
where cmd = 'attacked' and (val ->> 'opponentFinished')::bool
  and timestamp >= '2024-07-16 14:00:00 +00:00' and timestamp <= '2024-07-16 15:00:00 +00:00'
  and process_id <> 'p-4NGGl79EX_xwanjJJyjkSyOUknyJbhj61TAwj9nsQ'
  and process_id <> 'iSxR0exVxlpL26emdzNAa5YLvuL5aqDJX8tz5QiESS4'
group by val -> 'opponent' ->> 'walletAddress'
order by 2 desc;
---------------------------------------------------------------------------------------------------------------------

