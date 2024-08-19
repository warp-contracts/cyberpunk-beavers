1. dump db to a file
2. copy file from vm

```sh
gcloud compute scp --zone "..." vm_name:~ao/cu.dump cu_dump.dump
```

3.restore db to a file

```sh
pg_restore -U user -f dumpfile.sql -F c cu_dump.dump`
```

4. set schema in the db, e.g. "cu"

```sh
sed -i '' 's/public\./cu./g' dumpfile.sql
```

5. restore db from file to ao db with schema cu

```sh
psql -U user -d ao -f dumpfile.sql --set search_path=cu
```
