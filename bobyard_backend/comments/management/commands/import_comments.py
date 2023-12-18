import json
from django.core.management.base import BaseCommand
from comments.models import Comment
from django.utils.dateparse import parse_datetime

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        with open('comments.json', 'r') as file:
            data = json.load(file)
            for item in data['comments']:
                comment = Comment(
                    author=item['author'],
                    text=item['text'],
                    date=parse_datetime(item['date']),
                    likes=item['likes'],
                    image=item['image']
                )
                comment.save()
        self.stdout.write(self.style.SUCCESS('Successfully imported comments'))
