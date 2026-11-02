import yaml

with open('registry/methods-old.yaml', 'r') as f:
    old = yaml.safe_load(f)
with open('registry/methods.yaml', 'r') as f:
    new = yaml.safe_load(f)

old_ids = {e['id'] for e in old['entries']}
new_ids = {e['id'] for e in new['entries']}

print('=== BACKUP REGISTRY ===')
print(f'Total records: {len(old["entries"])}')
print(f'IDs: {sorted(old_ids)}')

print()
print('=== CURRENT REGISTRY ===')
print(f'Total records: {len(new["entries"])}')
print(f'IDs: {sorted(new_ids)}')

print()
print('=== ADDED IDs ===')
print(sorted(new_ids - old_ids))

print()
print('=== MISSING IDs ===')
print(sorted(old_ids - new_ids))

print()
print('=== SHARED IDs ===')
shared = old_ids & new_ids
print(f'Count: {len(shared)}')

# Find changed records
old_by_id = {e['id']: e for e in old['entries']}
new_by_id = {e['id']: e for e in new['entries']}

changed = []
for sid in shared:
    if old_by_id[sid] != new_by_id[sid]:
        changed.append(sid)
        
print(f'Changed records: {changed}')

# Check for status field in huang-us10980272
print()
print('=== huang-us10980272 comparison ===')
print('OLD keys:', list(old_by_id.get('huang-us10980272', {}).keys()))
print('NEW keys:', list(new_by_id.get('huang-us10980272', {}).keys()))
print()
print('OLD entry:', yaml.dump(old_by_id.get('huang-us10980272')))
print('NEW entry:', yaml.dump(new_by_id.get('huang-us10980272')))

# Also show the three added records
print()
print('=== ADDED RECORDS DETAIL ===')
for aid in sorted(new_ids - old_ids):
    print(f'--- {aid} ---')
    print(yaml.dump(new_by_id[aid]))

# Show the three changed records in detail
print()
print('=== CHANGED RECORDS DETAIL ===')
for cid in changed:
    print(f'--- {cid} ---')
    print('OLD:')
    print(yaml.dump(old_by_id[cid]))
    print('NEW:')
    print(yaml.dump(new_by_id[cid]))