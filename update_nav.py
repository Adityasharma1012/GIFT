import os
import glob

nav_to_replace = '<a href="chaos.html" class="nav-item">?? Chaos</a>'
nav_new = '<a href="loved.html" class="nav-item">?? Loved</a>\n    <a href="chaos.html" class="nav-item">?? Chaos</a>'

for file_path in glob.glob('*.html'):
    if file_path == 'loved.html':
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace(nav_to_replace, nav_new)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
