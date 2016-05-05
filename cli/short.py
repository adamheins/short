#!/usr/bin/env python

from __future__ import print_function

import random
import sys

from pymongo import MongoClient

client = MongoClient()
db = client['short']
links = db['links']

ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
DEFAULT_KEY_LENGTH = 6

HELP_TEXT = '''short: An extremely simple URL shortener.

The short CLI allows for creation of both custom and generated shortlinks.

Commands:
    add <key> <url> Add a new custom shortlink pointing to url.
    generate <url>  Generate a new random shortlink pointing to url.
    help            Print this text.
    list            List all shortlinks.
    remove <key>    Remove the shortlink with this key.
    show <key>      Show the URL associated with this key.
'''

def random_str(alphabet, length):
    s = ''
    for i in xrange(length):
        s += alphabet[random.randint(0, len(alphabet) - 1)]
    return s

def main():
    try:
        cmd = sys.argv[1]
    except IndexError:
        print(HELP_TEXT)
        return

    if cmd == 'add':
        key = sys.argv[2]
        url = sys.argv[3]

        existing_link = links.find_one({'key': key})
        if existing_link:
            print('Link already exists -> {}'.format(existing_link['url']))
        else:
            links.insert({'key': key, 'url': url})
    elif cmd == 'show':
        key = sys.argv[2]
        try:
            url = links.find_one({'key': key})['url']
            print(url)
        except:
            print('Link not found.')
    elif cmd == 'list':
        for link in links.find():
            print('{} -> {}'.format(link['key'], link['url']))
    elif cmd == 'remove':
        key = sys.argv[2]
        result = links.remove({'key': key})
        if result.n > 0:
            print('Found and removed {}'.format(key))
        else:
            print('Did not find and links with key {}'.format(key))
        print(result)
    elif cmd == 'generate':
        url = sys.argv[2]
        key = random_str(ALPHABET, DEFAULT_KEY_LENGTH)
        while links.find({'key': key}).count() > 0:
            key = random_str(ALPHABET, DEFAULT_KEY_LENGTH)
        links.insert({'key': key, 'url': url})
    elif cmd == 'help':
        print(HELP_TEXT)
    else:
        print('short: Unrecognized command \'{}\'. Try \'short help\'.'
                .format(cmd))

if __name__ == '__main__':
    main()
