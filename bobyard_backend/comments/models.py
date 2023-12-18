from django.db import models

class Comment(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveIntegerField(default=0)
    image = models.URLField(blank=True, null=True) # image is just URL for now

    def __str__(self):
        return self.text[:20]  

