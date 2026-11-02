import yaml
with open('registry/methods.yaml', 'r') as f:
    data = yaml.safe_load(f)
entries = data.get('entries', [])
print('Total entries:', len(entries))
for i, entry in enumerate(entries):
    citations = entry.get('citations')
    has_citations = 'YES' if citations else 'NO'
    status = entry.get('status', 'MISSING')
    print(f'  {i+1}. {entry["id"]} - status: {status} - citations: {has_citations}')