import requests
from bs4 import BeautifulSoup
import json

url = 'https://engnovate.com/ielts-reading-tests/cambridge-ielts-15-academic-reading-test-1/'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# We just want to extract the text from the content area to see the actual questions and options
content = soup.find('div', class_='entry-content')

if content:
    with open('scraped_reading.txt', 'w', encoding='utf-8') as f:
        f.write(content.get_text(separator='\\n', strip=True))
print('Done!')
