import os
import json

ROOT_DIR = os.path.join(os.path.dirname(__file__), 'root')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), 'filing.json')

def load_directory(path):
    dir_name = os.path.basename(path)
    meta_path = os.path.join(path, 'directory.json')
    with open(meta_path, 'r', encoding='utf-8') as f:
        meta = json.load(f)
    children = []
    for entry in os.listdir(path):
        full_path = os.path.join(path, entry)
        if entry == 'directory.json':
            continue
        if os.path.isdir(full_path):
            children.append(load_directory(full_path))
        else:
            with open(full_path, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
            children.append({
                'type': 'file',
                'name': entry,
                'content': content
            })
    return {
        'type': 'directory',
        'name': dir_name,
        'children': children,
        'meta': meta
    }

def main():
    # Instead of expecting directory.json in root, treat its subdirs as children
    children = []
    for entry in os.listdir(ROOT_DIR):
        full_path = os.path.join(ROOT_DIR, entry)
        if os.path.isdir(full_path):
            children.append(load_directory(full_path))
        elif entry != 'directory.json':
            with open(full_path, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
            children.append({
                'type': 'file',
                'name': entry,
                'content': content
            })
    filing = {
        'type': 'directory',
        'name': 'root',
        'children': children,
        'meta': None
    }
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(filing, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    main()
